import { addDays } from "date-fns";
import { sortTask } from ".";

test("it shorts tasks and keeps fav on top", () => {
  const tasks = [
    {
      title: "ccc",
      description: "description1",
      deadline: addDays(new Date(), 1),
      isFavorite: true,
    },
    {
      title: "bbb",
      description: "description2",
      deadline: addDays(new Date(), 1),
    },
    {
      title: "aaa",
      description: "description3",
      deadline: addDays(new Date(), 1),
    },
  ];
  const sortedTasks = sortTask(["col1", tasks]);
  expect(sortedTasks[0].title).toBe("ccc");
  expect(sortedTasks[1].title).toBe("aaa");
  expect(sortedTasks[2].title).toBe("bbb");
});
