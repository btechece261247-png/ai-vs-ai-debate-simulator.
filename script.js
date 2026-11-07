const scenarios = {
  growth: {
    label: "Stronger fictional growth",
    facts: ["Revenue index increased from 100 to 112.", "Customer activity index rose from 100 to 108.", "Operating costs increased by 4% in this fictional example."],
    positive: [
      "The scenario shows two supportive indicators: the revenue index rose to 112 and customer activity reached 108. Together, these suggest that demand may be broadening rather than relying on one metric.",
      "The 4% cost increase is worth monitoring, but it is smaller than the 12% revenue-index increase in this simplified dataset. If the pattern continued, operating leverage could become a possibility.",
      "My strongest point is that multiple indicators moved in the same direction. The main assumption is that the fictional trend is repeatable; one period alone cannot establish that."
    ],
    caution: [
      "The figures are only indexes, not audited financial statements. We do not know the starting margins, cash flow, customer retention, or whether the activity increase is sustainable.",
      "Comparing a 12% index change with a 4% cost change can be misleading because the measures may have different bases. Costs could accelerate later or reflect expenses not shown here.",
      "The positive case assumes persistence. Before drawing a firm conclusion, we would need several periods of data, cash-flow information, and a breakdown of recurring versus one-time growth."
    ],
    unknown: "Whether growth is recurring, how margins and cash flow changed, whether customer activity converts into revenue, and how the company performs across several periods."
  },
  costs: {
    label: "Rising operating costs",
    facts: ["Revenue index increased from 100 to 103.", "Operating-cost index increased from 100 to 111.", "Customer activity index stayed near 100."],
    positive: [
      "Revenue still moved upward to 103, so the fictional business has not stopped growing. Some cost increases may be temporary investments that support future capacity or service quality.",
      "If management can improve processes, renegotiate supplier terms, or spread fixed costs over higher activity, some pressure might ease over time.",
      "The constructive interpretation is possible, but it depends on evidence that the spending is temporary and produces measurable benefits."
    ],
    caution: [
      "Costs rose to 111 while revenue reached only 103 and customer activity stayed flat. In this simplified example, that mismatch is a clear warning that efficiency may be weakening.",
      "Calling the spending an investment is not enough. We need to know which costs increased, whether they are recurring, and whether customers are receiving additional value.",
      "Without a credible explanation or improvement plan, the cost trend creates uncertainty around future operating performance."
    ],
    unknown: "Which cost categories increased, whether the rise is temporary or recurring, the effect on margins, and whether planned efficiencies are realistic."
  },
  mixed: {
    label: "Mixed signals and uncertainty",
    facts: ["Revenue index increased from 100 to 106.", "Customer activity index declined from 100 to 97.", "Operating-cost index increased from 100 to 105."],
    positive: [
      "The revenue index rose to 106, which is a constructive signal. There may be a timing difference between customer activity and reported revenue, or a change in product mix.",
      "A business can sometimes grow revenue while serving fewer customers if average order value or product mix changes. That possibility deserves investigation rather than immediate dismissal.",
      "The positive case is plausible, but it needs a bridge explaining how revenue increased while activity declined."
    ],
    caution: [
      "Customer activity fell to 97 while costs rose to 105. That combination may indicate weaker engagement and less efficient operations, even though the revenue index increased.",
      "The revenue increase could be concentrated in a small number of transactions or reflect pricing changes. Without customer-level detail, it may not represent stronger underlying demand.",
      "The mixed signals make a confident conclusion inappropriate. We need volume, pricing, retention, and margin data before interpreting the trend."
    ],
    unknown: "Whether pricing or product mix explains the revenue increase, why activity declined, whether customers are returning, and how costs affect profitability."
  }
};

const $ = id => document.getElementById(id);
const transcript = $("transcript");
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function addTurn(name, tag, text, cls) {
  const card = document.createElement("article");
  card.className = `turn ${cls}`;
  const head = document.createElement("div");
  head.className = "turn-head";
  const who = document.createElement("b");
  who.textContent = name;
  const role = document.createElement("span");
  role.textContent = tag;
  const body = document.createElement("p");
  body.textContent = text;
  head.append(who, role);
  card.append(head, body);
  transcript.append(card);
}

function scoreScenario(key) {
  const base = {growth:[82,72,76,80], costs:[76,84,78,79], mixed:[78,82,83,81]}[key];
  return base.map((n,i) => Math.min(96, n + (i===2 ? 0 : 0)));
}

function renderVerdict(key) {
  const data = scenarios[key];
  const scores = scoreScenario(key);
  const labels = ["Evidence use", "Counterarguments", "Uncertainty awareness", "Logical consistency"];
  const avg = Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);
  $("verdictTitle").textContent = key === "mixed" ? "More evidence is needed" : key === "growth" ? "Positive signals, with caveats" : "Cost pressure deserves attention";
  $("verdictText").textContent = key === "mixed"
    ? "Neither argument fully resolves the conflicting indicators. The most responsible result is to withhold a strong conclusion."
    : key === "growth"
      ? "The optimistic case identifies encouraging indicators, while the skeptical case correctly highlights the limits of a short, simplified dataset."
      : "The skeptical case is better supported by the displayed cost and activity pattern, although the cause of the cost increase remains unknown.";
  $("scoreValue").textContent = avg;
  $("scoreRows").replaceChildren();
  labels.forEach((label,i) => {
    const item = document.createElement("div");
    item.className = "score-item";
    const name = document.createElement("span"); name.textContent = label;
    const value = document.createElement("b"); value.textContent = `${scores[i]}/100`;
    const bar = document.createElement("div"); bar.className = "bar";
    const fill = document.createElement("i"); fill.style.width = `${scores[i]}%`;
    bar.append(fill); item.append(name,value,bar); $("scoreRows").append(item);
  });
  $("unknownText").textContent = data.unknown;
  $("verdictEmpty").hidden = true;
  $("verdict").hidden = false;
}

async function runDebate() {
  const key = $("scenario").value;
  const depth = $("depth").value === "quick" ? 2 : 3;
  const data = scenarios[key];
  $("startBtn").disabled = true;
  $("startBtn").textContent = "Debate running…";
  $("emptyState").hidden = true;
  $("verdict").hidden = true;
  $("verdictEmpty").hidden = false;
  $("verdictEmpty").textContent = "The judge is reviewing the arguments…";
  transcript.replaceChildren();
  $("runState").textContent = "RUNNING SIMULATION";
  addTurn("SCENARIO BRIEF", "FICTIONAL INPUT", `${data.label}. ${data.facts.join(" ")}`, "judge-turn");
  await wait(450);
  for (let i=0; i<depth; i++) {
    addTurn("OPTIMIST · AGENT 01", `ROUND ${i+1}`, data.positive[i], "optimist");
    await wait(420);
    addTurn("SKEPTIC · AGENT 02", `ROUND ${i+1}`, data.caution[i], "skeptic");
    await wait(420);
  }
  addTurn("NEUTRAL JUDGE", "FINAL REVIEW", "I compared both positions using evidence quality, logical consistency, counterarguments, and awareness of missing information. The scorecard below is a transparent illustrative rubric, not a prediction.", "judge-turn");
  renderVerdict(key);
  $("runState").textContent = "DEBATE COMPLETE";
  $("startBtn").disabled = false;
  $("startBtn").innerHTML = 'Run debate <span>↗</span>';
}
$("startBtn").addEventListener("click", runDebate);
