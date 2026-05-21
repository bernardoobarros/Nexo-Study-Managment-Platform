const seedData = {
  courses: [
    { id: "course-history", name: "Modern World History", code: "HIST 204" },
    { id: "course-calculus", name: "Advanced Calculus", code: "MATH 301" },
    { id: "course-chemistry", name: "Organic Chemistry Lab", code: "CHEM 210" },
    { id: "course-philosophy", name: "Introduction to Philosophy", code: "PHIL 101" },
  ],
  assignments: [
    {
      id: "asg-history-essay",
      courseId: "course-history",
      title: "Decolonization essay draft",
      status: "in_progress",
      dueAt: "2026-05-22T18:00:00-03:00",
      effortMinutes: 180,
      priorityScore: 95,
      summary:
        "Write a four-source essay arguing which post-war pressure most accelerated decolonization in Southeast Asia.",
      description:
        "The essay needs a clear thesis, four credible sources, and a comparison between political pressure, economic pressure, and nationalist organizing after World War II.",
      deliverable: "1,200-word essay draft in Google Docs or DOCX format.",
      recommendedNextStep: "Lock the thesis first, then pull quotes from the two strongest sources before drafting the opening section.",
      requirements: [
        "State a defensible thesis in the introduction.",
        "Use at least four cited sources, including two academic sources.",
        "Compare at least two competing causes of decolonization.",
        "End with a short paragraph on why one cause mattered most.",
      ],
      quickPrompts: [
        "Summarize the attached reading in plain English.",
        "Give me a 60-minute work plan for this essay.",
        "Build an outline with claim, evidence, and conclusion.",
      ],
    },
    {
      id: "asg-calculus-pset",
      courseId: "course-calculus",
      title: "Problem set 5",
      status: "not_started",
      dueAt: "2026-05-23T12:00:00-03:00",
      effortMinutes: 120,
      priorityScore: 81,
      summary:
        "Complete eight integration problems focused on trig substitution and integration by parts.",
      description:
        "This set mixes direct computation with one application problem, so the fastest path is to group similar techniques before solving every question in order.",
      deliverable: "Handwritten or typed solutions with intermediate steps shown.",
      recommendedNextStep: "Sort the problems by method and solve the easiest integration-by-parts items first.",
      requirements: [
        "Show intermediate substitutions and simplifications.",
        "Label the final answer for each numbered problem.",
        "Check any trigonometric back-substitution before moving on.",
      ],
      quickPrompts: [
        "Classify each problem by solution method.",
        "Explain trig substitution like I have forgotten it.",
        "Give me a shortest-path order for the set.",
      ],
    },
    {
      id: "asg-philosophy-post",
      courseId: "course-philosophy",
      title: "Discussion post on virtue ethics",
      status: "missing",
      dueAt: "2026-05-20T23:59:00-03:00",
      effortMinutes: 45,
      priorityScore: 74,
      summary:
        "Respond to the weekly forum prompt comparing virtue ethics to utilitarianism using one course reading.",
      description:
        "The post is late already, but it is still recoverable. A compact response that clearly contrasts both frameworks is enough for a first pass.",
      deliverable: "250-word discussion post plus one reply to a classmate.",
      recommendedNextStep: "Write a short comparison table first, then turn it into the post body and submit before doing the reply.",
      requirements: [
        "Reference one assigned reading directly.",
        "Contrast virtue ethics and utilitarianism clearly.",
        "Include a practical example or scenario.",
      ],
      quickPrompts: [
        "Turn the prompt into a 3-part post structure.",
        "Compare the two frameworks with one concrete example.",
        "Draft a checklist for the forum submission.",
      ],
    },
    {
      id: "asg-chemistry-revision",
      courseId: "course-chemistry",
      title: "Lab report revision",
      status: "completed",
      dueAt: "2026-05-18T16:00:00-03:00",
      effortMinutes: 60,
      priorityScore: 20,
      summary:
        "Incorporate the instructor's feedback on the discussion section of the aspirin synthesis lab report.",
      description:
        "This work is already finished, but it stays in the system so the archive flow has a real record to point at later.",
      deliverable: "Revised lab report with updated discussion paragraphs.",
      recommendedNextStep: "No further action needed unless you want to save the final revision notes.",
      requirements: [
        "Address the instructor comments on IR peak interpretation.",
        "Clarify the yield discussion.",
      ],
      quickPrompts: [
        "Summarize the revision notes.",
        "Store the final lessons learned from this report.",
      ],
    },
  ],
  attachments: [
    { id: "att-history-1", assignmentId: "asg-history-essay", name: "Lecture notes week 9.pdf", kind: "pdf", meta: "Lecture notes - 1.3 MB" },
    { id: "att-history-2", assignmentId: "asg-history-essay", name: "Essay rubric.docx", kind: "docx", meta: "Rubric - 46 KB" },
    { id: "att-calculus-1", assignmentId: "asg-calculus-pset", name: "Problem_Set_05.pdf", kind: "pdf", meta: "Worksheet - 420 KB" },
    { id: "att-philosophy-1", assignmentId: "asg-philosophy-post", name: "Week_8_Prompt", kind: "link", meta: "Forum prompt link" },
    { id: "att-chemistry-1", assignmentId: "asg-chemistry-revision", name: "Instructor feedback.docx", kind: "docx", meta: "Feedback - 31 KB" },
  ],
  artifacts: [
    {
      id: "art-history-outline",
      assignmentId: "asg-history-essay",
      kind: "outline",
      title: "Argument outline",
      content: "Claim: nationalist organizing was the decisive driver. Support it with one paragraph on political pressure, one on economic fragility, and one on why local organizing converted pressure into actual independence movements.",
    },
    {
      id: "art-history-checklist",
      assignmentId: "asg-history-essay",
      kind: "checklist",
      title: "Fast checklist",
      content: "Choose thesis, skim rubric, mark four sources, write intro, draft two body paragraphs, then close with comparison and verdict.",
    },
    {
      id: "art-calculus-plan",
      assignmentId: "asg-calculus-pset",
      kind: "checklist",
      title: "Shortest-path solve order",
      content: "Start with the two direct integration-by-parts problems, then the trig substitution problems with obvious triangles, then the mixed application problem last.",
    },
    {
      id: "art-philosophy-outline",
      assignmentId: "asg-philosophy-post",
      kind: "outline",
      title: "Forum post scaffold",
      content: "Sentence 1: define both views. Sentence 2: practical example. Sentence 3: explain what virtue ethics emphasizes that utilitarianism misses. Sentence 4: brief verdict.",
    },
    {
      id: "art-chemistry-notes",
      assignmentId: "asg-chemistry-revision",
      kind: "notes",
      title: "Revision recap",
      content: "The strongest improvement was explaining why the IR carbonyl peak aligned with the product despite imperfect yield.",
    },
  ],
};

module.exports = { seedData };
