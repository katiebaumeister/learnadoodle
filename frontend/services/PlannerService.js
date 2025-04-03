import apiClient from './apiClient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const getCurriculum = async () => {
  return await apiClient('/api/get_subjects_and_units', 'GET');
};

export const curriculumToMarkdown = (curriculum) => {
  return curriculum
    .map((s) => {
      const lines = [`# ${s.student}'s Curriculum\n`];
      s.subjects.forEach((subj) => {
        lines.push(`## ${subj.subject}`);
        if (subj.objectives) lines.push(`**Objectives**: ${subj.objectives}`);
        if (subj.units && subj.units.length > 0) {
          lines.push(`### Units`);
          subj.units.forEach((u) => {
            lines.push(`- ${u.unit}: ${u.description}`);
          });
        }
      });
      return lines.join('\n');
    })
    .join('\n\n');
};

export const exportMarkdownToPDF = async (markdown, filename = 'Learnadoodle-Curriculum') => {
  const html = markdownToHTML(markdown);
  const { uri } = await Print.printToFileAsync({ html, base64: false });
  if (!(await Sharing.isAvailableAsync())) {
    throw new Error('Sharing is not available on this device.');
  }
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: `${filename}.pdf`,
    UTI: 'com.adobe.pdf',
  });
};

const markdownToHTML = (markdown) => {
  const html = markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/\n/g, '<br>');

  return `
    <html><head><style>
      body { font-family: sans-serif; padding: 20px; color: #333; }
      h1 { color: #3b0764; }
      h2 { color: #4f46e5; }
      h3 { color: #6b7280; }
      strong { font-weight: 600; }
      li { margin-left: 20px; }
    </style></head><body>${html}</body></html>
  `;
};

export const generateFullMarkdown = (familyData, student) => {
  const lines = [
    `# Learnadoodle Homeschool Summary`,
    `**Parent**: ${familyData.family}`,
    `**Academic Year**: ${familyData.academic_year}`,
    `**Student**: ${student.student} (${student.grade})`,
    ``,
    `---`,
    `## 🧠 Curriculum`,
  ];
  student.subjects.forEach((s) => {
    lines.push(`### ${s.subject}`);
    if (s.objectives) lines.push(`**Objectives**: ${s.objectives}`);
    if (s.units?.length > 0) {
      lines.push(`**Units**:`);
      s.units.forEach((u) => lines.push(`- ${u.unit}: ${u.description}`));
    }
    lines.push('');
  });
  lines.push(`---\n## 📓 Journal`);
  Object.entries(student.journal || {}).forEach(([subject, weeks]) => {
    lines.push(`### ${subject}`);
    Object.entries(weeks).forEach(([week, lessons]) => {
      lines.push(`- ${week}: ${lessons.join(', ')}`);
    });
  });
  return lines.join('\n');
};

export const markdownToHTMLPreview = markdownToHTML;
