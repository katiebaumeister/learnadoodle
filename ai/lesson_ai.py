from orchestrator import ai_agent
import openai
import json

@ai_agent("lesson_ai")
async def lesson_agent(data, snapshot):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"You are the Lesson AI.\n\nSnapshot:\n{json.dumps(snapshot)}\n\nAdjust lesson plans, take daily feedback, and suggest updates. Return {{ table_updates, trigger, message }}"}
        ]
    )
    return json.loads(response['choices'][0]['message']['content'])
