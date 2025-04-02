from orchestrator import ai_agent
import openai
import json

@ai_agent("planner")
async def planner_agent(data, snapshot):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"You are the Planner AI.\nHere is the snapshot:\n{json.dumps(snapshot)}\nReply with table_updates, trigger, and message as JSON."}
        ]
    )
    return json.loads(response['choices'][0]['message']['content'])
