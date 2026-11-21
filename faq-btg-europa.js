const faqTopics = [
  {title:"Abertura e elegibilidade", sections:[{title:"Conta", questions:[
    {question:"Quanto tempo leva para abrir uma conta no BTG Europa?", answer:"A abertura da conta é rápida em comparação a outras instituições europeias."},
    {question:"Qual é o mínimo para abrir uma conta?", answer:"O mínimo de abertura é de 250 mil euros ou dólares."},
    {question:"Quais residências fiscais podem abrir conta?", answer:"São aceitas contas de qualquer residência fiscal, exceto residentes fiscais americanos."}
  ]}]},
  {title:"Custódia e regulamentação", sections:[{title:"Instituição", questions:[
    {question:"O BTG Europa é uma instituição regulada?", answer:"Sim. A instituição é regulada pela CSSF e segue o padrão europeu de proteção ao investidor."}
  ]}]},
  {title:"Conta e serviços", sections:[{title:"Moedas e cartões", questions:[
    {question:"Quais moedas estão disponíveis na conta multimoedas?", answer:"A conta é multimoedas e contempla USD, EUR, GBP, CHF e CAD."},
    {question:"A partir de qual valor posso ter cartão de crédito?", answer:"O cartão de crédito está disponível a partir de 1 milhão de euros ou dólares."}
  ]}]},
  {title:"Crédito", sections:[{title:"Taxas", questions:[
    {question:"Como funcionam as taxas de crédito?", answer:"As taxas de crédito são indicativas. Consulte o banker da estrutura para análise de cada caso."}
  ]}]},
  {title:"Investimentos", sections:[{title:"Mercados e produtos", questions:[
    {question:"Que mercados e ativos posso acessar?", answer:"Há acesso direto a mercados globais, incluindo renda fixa, renda variável, fundos e estruturas internacionais."},
    {question:"A plataforma oferece opções de diversificação?", answer:"Sim. A plataforma é aberta e oferece ampla diversificação de gestores e estratégias."}
  ]}]},
  {title:"Operações", sections:[{title:"Estrutura", questions:[
    {question:"A estrutura é eficiente operacionalmente?", answer:"Sim. A estrutura foi desenhada para oferecer eficiência operacional no atendimento e na administração das operações internacionais."}
  ]}]}
];

const topicList = document.getElementById("faq-topic-list");
const faqContent = document.getElementById("faq-content");

faqTopics.forEach((topic, topicIndex) => {
  const topicId = `faq-topic-${topicIndex + 1}`;
  const topicButton = document.createElement("button");
  topicButton.className = "faq-topic-button";
  topicButton.type = "button";
  topicButton.dataset.topicIndex = String(topicIndex);
  topicButton.setAttribute("aria-controls", topicId);
  topicButton.setAttribute("aria-pressed", topicIndex === 0 ? "true" : "false");
  topicButton.textContent = topic.title;
  topicList.append(topicButton);

  const category = document.createElement("section");
  category.className = "faq-category";
  category.id = topicId;
  category.hidden = topicIndex !== 0;
  const categoryTitle = document.createElement("h2");
  categoryTitle.textContent = topic.title;
  category.append(categoryTitle);

  topic.sections.forEach((section, sectionIndex) => {
    const sectionTitle = document.createElement("h3");
    sectionTitle.className = "faq-subtopic";
    sectionTitle.textContent = section.title;
    category.append(sectionTitle);
    section.questions.forEach((entry, questionIndex) => {
      const question = document.createElement("details");
      question.className = "faq-question";
      const summary = document.createElement("summary");
      const number = document.createElement("span");
      number.className = "faq-question-number";
      number.textContent = String(questionIndex + 1).padStart(2, "0");
      const questionText = document.createElement("span");
      questionText.textContent = entry.question;
      summary.append(number, questionText);
      const answer = document.createElement("div");
      answer.className = "faq-answer";
      const answerText = document.createElement("p");
      answerText.textContent = entry.answer;
      answer.append(answerText);
      question.append(summary, answer);
      category.append(question);
    });
  });
  faqContent.append(category);
});

const topicButtons = Array.from(topicList.querySelectorAll(".faq-topic-button"));
function activateTopic(topicIndex) {
  topicButtons.forEach((button, index) => {
    const active = index === topicIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  Array.from(faqContent.querySelectorAll(".faq-category")).forEach((category, index) => {
    category.hidden = index !== topicIndex;
  });
}
topicButtons.forEach((button) => button.addEventListener("click", () => activateTopic(Number(button.dataset.topicIndex))));
