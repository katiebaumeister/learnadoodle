from orchestrator import ai_agent
import openai
import json

@ai_agent("onboarding")
async def onboarding_agent(data, snapshot):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"You are the Onboarding AI.\n\nSnapshot:\n{json.dumps(snapshot)}\n\nAsk about missing data, setup the calendar, and return {{ table_updates, trigger, message }}"}
        ]
    )
    return json.loads(response['choices'][0]['message']['content'])
