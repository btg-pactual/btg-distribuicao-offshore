const faqTopics = [
  {title:"Abertura de conta", sections:[
    {title:"Pessoa física", questions:[
      {question:"Como funciona o processo de abertura de conta PF?", answer:"O processo de abertura de conta PF é realizado diretamente pelo website. O assessor envia o lead via portal administrativo; os dados são ajustados pela equipe responsável e o cliente recebe um e-mail com o link de abertura. O cliente deverá inserir seus dados pessoais e enviar documento de identidade e comprovante de endereço."}
    ]},
    {title:"Pessoa jurídica — PIC", questions:[
      {question:"Quais documentos societários são necessários para abrir uma conta PJ — PIC?", answer:"São necessários: Certificate of Incorporation; By Laws — Memorandum & Articles of Association; Share Certificate assinado ou Register of Members; Register of Directors; informações de W-Form; e Tax ID, quando aplicável."},
      {question:"A conta terá Margin Agreement?", answer:"Uma conta margem é uma conta aprovada pela corretora para empréstimos pela empresa, com o objetivo de alavancar o portfólio. Após a aprovação, a conta está sujeita às regras de órgãos reguladores, como Federal Reserve Board, FINRA e as bolsas de valores."},
      {question:"Quais documentos são exigidos de sócios e diretores?", answer:"Documento de identidade válido (Passaporte, CNH ou RG); comprovante de residência (luz, água, gás, telefone, internet ou IPTU), emitido há no máximo três meses; e Tax ID para cada beneficiário com participação a partir de 10% na empresa."}
    ]},
    {title:"LLC", questions:[
      {question:"Quais documentos são necessários para abrir uma conta LLC?", answer:"São necessários Certificate of Formation ou Articles of Organization; By-laws, LLC Agreement ou Operating Agreement; documento com os beneficiários finais, caso não esteja no bylaws; documento com os diretores da empresa, caso não esteja no bylaws; número de identificação fiscal; e W-Form."},
      {question:"Quais documentos são exigidos dos diretores e beneficiários com 10% ou mais?", answer:"É necessário enviar cópia de documento de identificação válido, número de identificação fiscal e endereço completo para cada diretor e beneficiário com participação igual ou superior a 10%."}
    ]}
  ]},
  {title:"Plataforma BTG US", sections:[
    {title:"Acesso e custódia", questions:[
      {question:"O BTG US é uma plataforma adicional ou integrada ao BTG Pactual?", answer:"É uma plataforma adicional — Portal Global — disponibilizada pelo BTG Pactual. O mínimo de investimento é USD 500 mil e a custódia é realizada pela Pershing."},
      {question:"Para quais perfis de investidor o BTG US está disponível?", answer:"O BTG US atende pessoa física individual e pessoa jurídica, incluindo W-9."},
      {question:"O BTG US oferece conta multimoedas?", answer:"Sim. A plataforma oferece conta multimoedas."}
    ]},
    {title:"Produtos e atribuições", questions:[
      {question:"Quais produtos estão disponíveis no BTG US?", answer:"A plataforma oferece ativos listados, renda fixa, mutual funds, fundos alternativos, produtos estruturados, derivativos, câmbio e carteira administrada BTG Pactual."},
      {question:"Como funciona a gestão discricionária BTG Pactual?", answer:"A gestão é discricionária e oferece portfólios globais diversificados, portfólios personalizados conforme objetivos e tolerância ao risco, e gestão ativa de portfólios com acesso a soluções, recursos institucionais e estratégias exclusivas para os clientes."}
    ]}
  ]},
  {title:"Mercados e investimentos", sections:[
    {title:"Estratégias disponíveis", questions:[
      {question:"O BTG US disponibiliza investimentos em ações e fundos?", answer:"Sim. Estão disponíveis ações e ETFs, REITs e ADRs, renda fixa, mutual funds, fundos alternativos, produtos estruturados e derivativos."},
      {question:"Quais alternativas de renda fixa e gestão estão disponíveis?", answer:"Há acesso a renda fixa corporativa e soberana, ativos de diferentes mercados e emissores, além de portfólios administrados e gestão discricionária BTG Pactual."}
    ]}
  ]},
  {title:"Fundos alternativos e UCITS", sections:[
    {title:"Produtos disponíveis", questions:[
      {question:"O BTG US oferece fundos alternativos e UCITS?", answer:"Sim. O BTG US disponibiliza fundos alternativos e UCITS como parte da oferta de investimento."}
    ]}
  ]}
];

const topicList = document.getElementById("faq-topic-list");
const faqContent = document.getElementById("faq-content");

faqTopics.forEach((topic, topicIndex) => {
  const topicId = `faq-topic-${topicIndex + 1}`;
  const button = document.createElement("button");
  button.className = "faq-topic-button";
  button.type = "button";
  button.dataset.topicIndex = String(topicIndex);
  button.setAttribute("aria-controls", topicId);
  button.setAttribute("aria-pressed", topicIndex === 0 ? "true" : "false");
  button.textContent = topic.title;
  topicList.append(button);

  const category = document.createElement("section");
  category.className = "faq-category";
  category.id = topicId;
  category.hidden = topicIndex !== 0;
  const title = document.createElement("h2");
  title.textContent = topic.title;
  category.append(title);

  topic.sections.forEach((section) => {
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
      const text = document.createElement("span");
      text.textContent = entry.question;
      summary.append(number, text);
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

const buttons = Array.from(topicList.querySelectorAll(".faq-topic-button"));
buttons.forEach((button) => button.addEventListener("click", () => {
  buttons.forEach((item, index) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  Array.from(faqContent.querySelectorAll(".faq-category")).forEach((category, index) => {
    category.hidden = index !== Number(button.dataset.topicIndex);
  });
}));
