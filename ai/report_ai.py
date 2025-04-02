from orchestrator import ai_agent
import openai
import json

@ai_agent("report_ai")
async def report_ai(data, snapshot):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"You are the Report AI.\n\nSnapshot:\n{json.dumps(snapshot)}\n\nGenerate a progress report or transcript for parents. Return {{ table_updates, trigger, message }}"}
        ]
    )
    return json.loads(response['choices'][0]['message']['content'])
