from orchestrator import ai_agent
import openai
import json

@ai_agent("builder")
async def builder_agent(data, snapshot):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"You are the Builder AI.\n\nSnapshot:\n{json.dumps(snapshot)}\n\nGenerate all lessons for each subject. Respect schedule_pattern and target_days. Return {{ table_updates, trigger, message }}"}
        ]
    )
    return json.loads(response['choices'][0]['message']['content'])
