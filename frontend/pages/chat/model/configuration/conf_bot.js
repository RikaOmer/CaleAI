import Activities from "../../../../assets/Activities";
const activities_options = Object.keys(Activities).map((key) => {
  return {
    type: "Button",
    label: Activities[key].label,
    emoji: Activities[key].emoji,
    value: key,
    page: "category"
  };
});

export default conf_bot = {
  greeting: {
    key: "greeting",
    bot_label: "Hello, I am Cale Bot. How can I help you today?",
    options: [
      {
        type: "Button",
        label: "Add Task",
        value: "add_task",
        successor: [
          {
            bot_label: "Great! What Category does the task belong to?",
            key: "category",
            options: activities_options,
          },
          {
            bot_label: "How Often do you want to do this task?",
            key: "frequency",
            options: [
              { type: "Button", label: "Daily", value: "daily", page: "frequency" },
              { type: "Button", label: "Weekly", value: "weekly", page: "frequency" },
              { type: "Button", label: "Monthly", value: "monthly", page: "frequency" },
            ],
          },

          {
            bot_label: "what time of the day do you wish to do this task?",
            key: "time",
            options: [
              { type: "Button", label: "Morning", value: "Morning", page: "time" },
              { type: "Button", label: "Noon", value: "Noon", page: "time" },
              { type: "Button", label: "Evening", value: "Evening", page: "time" },
            ],
          },

          {
            bot_label: "How long do you want to spend on this task?",
            key: "duration",
            options: [
              {
                type: "text-hours-minutes",
                label: "Set Duration",
              },
            ],
          },
            {
            bot_label: "Task Added! what next?",
            key: "more?",
            type: "Button",
            value: "more?",

            options: [
              { type: "Button", label: "Add another task", value: "more" },
              { type: "Button", label: "Generate calendar", value: "generate" },
            ],
          },

        ],
      },
      {
        type: "Button",
        label: "Generate New Calendar",
        value: "generate",
        successor: [],
      },
      {
        type: "Button",
        label: "Ask me a question",
        value: "gemini",
        successor: [],
      },
    ],
  },
};
