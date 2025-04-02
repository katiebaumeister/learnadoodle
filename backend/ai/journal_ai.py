from orchestrator import ai_agent
import openai
import json

@ai_agent("journal_ai")
async def journal_ai(data, snapshot):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"You are the Journal AI.\n\nSnapshot:\n{json.dumps(snapshot)}\n\nCreate a simple, factual week-by-week Markdown summary of what was learned. Return {{ table_updates, trigger, message }}"}
        ]
    )
    return json.loads(response['choices'][0]['message']['content'])
