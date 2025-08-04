# 🔁 Action Pipeline: Loop and Template Rendering Guide

This guide explains how to use loop control operations and dynamic template rendering in the action pipeline system using `InteractionAtom` configuration.

---

## 📌 Supported Special Operations

### 1. `LoopStart`
Marks the beginning of a loop block.

**Fields:**
- `start`: (optional) start index/key. Example: `{ source: "exact", value: 2 }`
- `end`: (optional) end index/key. Example: `{ source: "exact", value: 10 }`
- `loopOver`: (optional) array, object, number, or string to loop over

During each iteration, the system sets the following:
- `loop.index`: Current index or key
- `loop.value`: Current item or value

### 2. `LoopEnd`
Marks the end of the loop block. The loop continues until the end is reached or `LoopBreak` is triggered.

### 3. `LoopBreak`
Optional atom that allows you to break out of the loop early based on some condition (like `if (index === 6)`).

When executed, the loop immediately stops and skips all remaining iterations.

### 4. `renderTemplate`
This action dynamically renders UI based on a registered template.

**Parameters:**
1. `templateId`: ID of the registered template.
2. `loop.index`: The current iteration index.
3. `loop.value`: The current iteration value or item.

Example:
```json
{
  "action": "renderTemplate",
  "params": [
    { "source": "exact", "value": "child-2Template" },
    { "source": "loop", "value": "index" },
    { "source": "loop" }
  ]
}
```

---

## 🧠 Example Flow

```jsonc
[
  {
    "id": "loop1",
    "config": {
      "trigger": "OnLoad",
      "action": "func1",
      "params": [{ "source": "exact", "value": "login-form" }]
    }
  },
  {
    "id": "loop2",
    "config": {
      "op": "LoopStart",
      "start": { "source": "exact", "value": 2 },
      "end": { "source": "exact", "value": 10 },
      "dependencies": ["loop1"]
    }
  },
  {
    "id": "renderTemplateId",
    "config": {
      "action": "renderTemplate",
      "dependencies": ["loop2"],
      "params": [
        { "source": "exact", "value": "child-2Template" },
        { "source": "loop", "value": "index" },
        { "source": "loop" }
      ]
    }
  },
  {
    "id": "loop3",
    "config": {
      "action": "Operate",
      "dependencies": ["renderTemplateId"],
      "params": [
        { "source": "exact", "value": 6 },
        { "source": "loop", "value": "index" },
        { "source": "exact", "value": "==" }
      ]
    }
  },
  {
    "id": "loopCondition",
    "config": {
      "op": "Conditional",
      "dependencies": ["loop3"],
      "action": "Switch",
      "params": [
        { "source": "pipe" },
        {
          "source": "exact",
          "value": [
            { "case": true, "return": ["loopBreak"] },
            { "case": false, "return": ["loop4"] }
          ]
        }
      ]
    }
  },
  {
    "id": "loopBreak",
    "config": {
      "op": "LoopBreak",
      "dependencies": ["loopCondition"],
      "action": "func2"
    }
  },
  {
    "id": "loop4",
    "config": {
      "dependencies": ["loopCondition"],
      "action": "func1"
    }
  },
  {
    "id": "loop5",
    "config": {
      "op": "LoopEnd",
      "dependencies": ["loop3"],
      "action": "func1"
    }
  },
  {
    "id": "loop6",
    "config": {
      "dependencies": ["loop5"],
      "action": "func2"
    }
  }
]
```

---

## 🧪 What This Example Does

1. Runs `func1` on load (`loop1`).
2. Star
