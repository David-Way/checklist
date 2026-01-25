const WORKOUT_DATA = {
  "Week 1": {
    "Day 1": {
      restPeriod: "60",
      Beginner: [2, 3, 2, 2, "3+"],
      Intermediate: [6, 7, 4, 4, "5+"],
      Experienced: [11, 12, 8, 7, "10+"]
    },
    "Day 2": {
      restPeriod: "60",
      Beginner: [3, 4, 3, 2, "4+"],
      Intermediate: [7, 7, 6, 4, "6+"],
      Experienced: [11, 12, 10, 7, "12+"]
    },
    "Day 3": {
      restPeriod: "60",
      Beginner: [5, 6, 4, 3, "6+"],
      Intermediate: [9, 9, 7, 5, "7+"],
      Experienced: [12, 14, 11, 10, "14+"]
    }
  },

  "Week 2": {
    "Day 1": {
      restPeriod: "60",
      Beginner: [4, 6, 4, 4, "6+"],
      Intermediate: [9, 11, 8, 8, "11+"],
      Experienced: [14, 14, 10, 10, "15+"]
    },
    "Day 2": {
      restPeriod: "90",
      Beginner: [5, 6, 5, 5, "7+"],
      Intermediate: [10, 12, 9, 9, "13+"],
      Experienced: [14, 16, 12, 12, "17+"]
    },
    "Day 3": {
      restPeriod: "120",
      Beginner: [5, 8, 6, 6, "10+"],
      Intermediate: [10, 12, 10, 10, "15+"],
      Experienced: [16, 17, 14, 14, "20+"]
    }
  },

  "Week 3": {
    "Day 1": {
      restPeriod: "60",
      Beginner: [10, 12, 8, 6, "9+"],
      Intermediate: [13, 18, 13, 12, "16+"],
      Experienced: [14, 18, 15, 13, "22+"]
    },
    "Day 2": {
      restPeriod: "90",
      Beginner: [10, 12, 9, 6, 7, "12+"],
      Intermediate: [13, 16, 13, 12, 12, "18+"],
      Experienced: [15, 17, 15, 13, 14, "24+"]
    },
    "Day 3": {
      restPeriod: "120",
      Beginner: [12, 13, 9, 8, 9, "13+"],
      Intermediate: [16, 20, 15, 13, 14, "20+"],
      Experienced: [18, 21, 19, 17, 18, "26+"]
    }
  },

  "Week 4": {
    "Day 1": {
      restPeriod: "60",
      Beginner: [14, 16, 12, 12, "18+"],
      Intermediate: [20, 25, 20, 20, "28+"],
      Experienced: [25, 29, 25, 25, "36+"]
    },
    "Day 2": {
      restPeriod: "90",
      Beginner: [16, 18, 13, 13, "20+"],
      Intermediate: [23, 28, 23, 23, "33+"],
      Experienced: [29, 33, 29, 29, "40+"]
    },
    "Day 3": {
      restPeriod: "120",
      Beginner: [18, 20, 15, 15, "25+"],
      Intermediate: [28, 30, 25, 25, "38+"],
      Experienced: [33, 35, 30, 30, "45+"]
    }
  },

  "Week 5": {
    "Day 1": {
      restPeriod: "60",
      Beginner: [17, 19, 15, 15, "20+"],
      Intermediate: [28, 35, 25, 22, "35+"],
      Experienced: [36, 40, 30, 24, "40+"]
    },
    "Day 2": {
      restPeriod: "45",
      Beginner: [10, 10, 13, 13, 10, 10, 9, "25+"],
      Intermediate: [18, 18, 20, 20, 14, 14, 16, "40+"],
      Experienced: [19, 19, 22, 22, 18, 18, 22, "45+"]
    },
    "Day 3": {
      restPeriod: "45",
      Beginner: [13, 13, 15, 15, 12, 12, 10, "30+"],
      Intermediate: [18, 18, 20, 20, 17, 17, 20, "45+"],
      Experienced: [20, 20, 24, 24, 20, 20, 22, "50+"]
    }
  },

  "Week 6": {
    "Day 1": {
      restPeriod: "60",
      Beginner: [25, 30, 20, 15, "40+"],
      Intermediate: [40, 50, 25, 25, "50+"],
      Experienced: [45, 55, 35, 30, "55+"]
    },
    "Day 2": {
      restPeriod: "45",
      Beginner: [14, 14, 15, 15, 14, 14, 10, 10, "44+"],
      Intermediate: [20, 20, 23, 23, 20, 20, 18, 18, "53+"],
      Experienced: [22, 22, 30, 30, 24, 24, 18, 18, "58+"]
    },
    "Day 3": {
      restPeriod: "45",
      Beginner: [13, 13, 17, 17, 16, 16, 14, 14, "50+"],
      Intermediate: [22, 22, 30, 30, 25, 25, 18, 18, "55+"],
      Experienced: [26, 26, 33, 33, 26, 26, 22, 22, "60+"]
    }
  }
};


function buildSetProperties(sets) {
  if (!Array.isArray(sets)) return; /// excluded rest period
  const props = {};
  sets.forEach((rep, index) => {
    const isLast = index === sets.length - 1;
    props[`set${index + 1}`] = {
      type: "boolean",
      label: isLast
        ? `Set ${index + 1} — max (${rep})`
        : `Set ${index + 1} — ${rep} reps`,
      ...(isLast && {
        description: `Aim for at least ${rep.replace("+", "")} reps`
      })
    };
  });
  return props;
}

function generateAllOf(workoutData) {
  const allOf = [];

  for (const [week, days] of Object.entries(workoutData)) {
    for (const [day, levels] of Object.entries(days)) {
      for (const [intensity, sets] of Object.entries(levels)) {
        allOf.push({
          if: {
            properties: {
              Stage: { const: week },
              Day: { const: day },
              Intensity: { const: intensity }
            },
            required: ["Stage", "Day", "Intensity"]
          },
          then: {
            properties: {
              followUpQuestion: {
                type: "object",
                title: "Target Sets",
                description: `Rest at least ${levels.restPeriod} seconds between sets`,
                properties: buildSetProperties(sets)
              }
            },
            required: ["followUpQuestion"]
          }
        });
      }
    }
  }

  return allOf;
}

function generateSchema() {
  return {
    version: "1.0.0",
    $id: "1000000",
    title: "100 Pushups",
    description:
      "A training program to go from just one pushup to 100 consecutive reps in less than two months.",
    meta: {
      author: "David Way",
      lastUpdated: "17/01/2026",
      tags: ["workout"]
    },
    properties: {
      Stage: {
        type: "string",
        enum: Object.keys(WORKOUT_DATA)
      },
      Day: {
        type: "string",
        enum: ["Day 1", "Day 2", "Day 3"]
      },
      Intensity: {
        type: "string",
        enum: ["Beginner", "Intermediate", "Experienced"]
      }
    },
    required: ["Stage", "Day", "Intensity"],
    allOf: generateAllOf(WORKOUT_DATA)
  };
}

// OUTPUT
const schema = generateSchema();
console.log(JSON.stringify(schema, null, 2));
