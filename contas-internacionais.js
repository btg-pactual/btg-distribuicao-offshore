const tabList = document.querySelector('[role="tablist"]');

if (tabList) {
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

  function activateTab(tab, moveFocus = false) {
    tabs.forEach((currentTab) => {
      const selected = currentTab === tab;
      currentTab.setAttribute("aria-selected", String(selected));
      currentTab.tabIndex = selected ? 0 : -1;

      const panel = document.getElementById(currentTab.getAttribute("aria-controls"));
      if (panel) {
        panel.hidden = !selected;
      }
    });

    if (moveFocus) {
      tab.focus();
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });
}

const fundGroups = [
  {name:"Renda Fixa - Curta Duração", products:[
    {name:"PIMCO Low Duration Income", isin:"IE00BDT57T44", ytd:-0.31},
    {name:"Lord Abbett Short Duration Income", isin:"IE00BFNWXY26", ytd:0.24},
    {name:"Muzinich Enhanced Yield Short-Term", isin:"IE00BF2T2K37", ytd:0.52}
  ]},
  {name:"Renda Fixa - Curta Duração Ligada à Inflação", products:[
    {name:"AXA Global Inflation Short Duration", isin:"LU1353950568", ytd:0.68}
  ]},
  {name:"Renda Fixa - Flexível", products:[
    {name:"PIMCO Income", isin:"IE00B7KFL990", ytd:-3.48},
    {name:"BTG Pactual Global Fixed Income", isin:"LU2842190071", ytd:-2.84},
    {name:"Morgan Stanley Global Fixed Income Opportunities", isin:"LU0694238766", ytd:-0.99}
  ]},
  {name:"Money Market", products:[
    {name:'INVESCO US DOLLAR LIQUIDITY PORTFOLIO "RES" (USD) ACC', isin:"IE00BLDGKV28", ytd:2.44, minimum:"USD 1.000,00", redemption:"D+1"},
    {name:"FT Western Asset US Government Liquidity", isin:"IE00B19Z6R17", ytd:2.31, minimum:"USD 100,00", redemption:"D+1"}
  ]},
  {name:"Crédito Global (posição existente)", products:[
    {name:"BTG Pactual Sicav Global Credit Fund", isin:"LU3435271443", minimum:"USD 1.000,00", redemption:"D+2/D+6", yield:"7.44% a.a."}
  ]},
  {name:"Renda Fixa - Agregado Global", products:[
    {name:"PIMCO Total Return Bond", isin:"IE00B11XZ988", ytd:-3.95}
  ]},
  {name:"Renda Fixa - Grau de Investimento", products:[
    {name:"JPM Global Corporate Bond", isin:"LU0408846375", ytd:-2.86},
    {name:"Goldman Sachs - US Credit", isin:"LU0546920561", ytd:-4.40},
    {name:"MAN GLG Global Inverstment Grade Opportunities", isin:"IE000GDY7UP9", ytd:-0.39}
  ]},
  {name:"Renda Fixa - High Yield", products:[
    {name:"AXA US Short Duration High Yield", isin:"LU0292585030", ytd:-0.18},
    {name:"Nomura US High Yield", isin:"IE00B3RW7J78", ytd:-0.38},
    {name:"Blackrock Global High Yield Bond", isin:"LU0171284937", ytd:0.06},
    {name:"Robeco High Yield", isin:"LU0594695099", ytd:0.23},
    {name:"Oaktree Global Credit Fund R USD Acc", isin:"LU1617686933", ytd:0.53},
    {name:"Nordea 1 - European High Yield Bond", isin:"LU0637316331", ytd:1.02}
  ]},
  {name:"Renda Fixa - Mercados Emergentes", products:[
    {name:"Goldman Sachs EM Corporate Bond", isin:"LU0622305505", ytd:-0.11},
    {name:"Loomis Sayles S/T EM Markets Bond", isin:"LU0980585243", ytd:-0.03},
    {name:"BTG SICAV Latin American Corporate Debt", isin:"LU0866202517", ytd:0.96},
    {name:"Neuberger Berman Emerging Markets Debt HC", isin:"IE00B986J944", ytd:-0.79}
  ]},
  {name:"Renda Fixa - Retorno Absoluto", products:[
    {name:"Jupiter Strategic Absolute Return", isin:"IE000FBV19S5", ytd:2.00},
    {name:"DNCA Invest Alpha Bonds", isin:"LU1860994273", ytd:2.08}
  ]},
  {name:"Ações - Global", products:[
    {name:"BTG Pactual Sicav Global Equities", isin:"LU3060589838", ytd:9.72, minimum:"USD 1.000,00", redemption:"D+2/D+6"},
    {name:"Jupiter Merian World Equity", isin:"IE0005263466", ytd:12.42},
    {name:"Wellington Global Quality Growth", isin:"LU1084869962", ytd:6.76},
    {name:"WCM Select Global Growth Equity", isin:"LU2169560799", ytd:8.38},
    {name:"JPM Global Select Equity", isin:"LU0070217475", ytd:5.76}
  ]},
  {name:"Ações - EUA Crescimento", products:[
    {name:"Loomis Sayles US Growth", isin:"LU1429558221", ytd:-1.24},
    {name:"AB American Growth Portfolio", isin:"LU0079474960", ytd:4.42}
  ]},
  {name:"Ações - EUA Valor", products:[
    {name:"FTGF Clearbridge US Value Fund", isin:"IE00B19Z3581", ytd:10.58}
  ]},
  {name:"Ações - EUA Blend", products:[
    {name:"PIMCO US StockPLUS", isin:"IE00B1D7YP71", ytd:11.38},
    {name:"T.Rowe Price US Structured Research Equity Fund", isin:"LU2954937806", ytd:12.42}
  ]},
  {name:"Ações - EUA Blend 130/30", products:[
    {name:"JP Morgan US Select Equity Plus", isin:"LU0292454872", ytd:7.88}
  ]},
  {name:"Ações - EUA Small Cap", products:[
    {name:"T.Rowe Price US Smaller Companies", isin:"LU0133096635", ytd:7.74}
  ]},
  {name:"Ações - Europa", products:[
    {name:"GS Europe CORE Portfolio", isin:"LU1599216030", ytd:8.35}
  ]},
  {name:"Ações - Japão", products:[
    {name:"Nomura Japan Strategic Value", isin:"IE00B3XBYN16", ytd:12.04},
    {name:"Franklin Templeton Japan Fund", isin:"LU0231790832", ytd:11.96}
  ]},
  {name:"Ações - Mercados Emergentes", products:[
    {name:"Wellington Emerging Markets Research", isin:"LU1366343215", ytd:27.27},
    {name:"Robeco QI Emerging Markets", isin:"LU0565011698", ytd:28.48},
    {name:"Wellington Asia Technology", isin:"LU1751454437", ytd:37.44},
    {name:"Schroder Asian Opportunities", isin:"LU0106259558", ytd:26.60}
  ]},
  {name:"Ações - Setores", products:[
    {name:"Blackrock World Technology", isin:"LU0056508442", ytd:36.97},
    {name:"BlueBox Funds Global Technology", isin:"LU1793345262", ytd:28.00},
    {name:"Janus Henderson Global Life Science", isin:"IE0009355771", ytd:6.09},
    {name:"AB International Health Care", isin:"LU0058720904", ytd:4.65}
  ]},
  {name:"Ações - Temáticos", products:[
    {name:"Pictet - Robotics", isin:"LU1279333675", ytd:29.84}
  ]},
  {name:"REITs", products:[
    {name:"Janus Henderson Global Property", isin:"LU0209137388", ytd:3.78},
    {name:"Nordea 1 - Global Real Estate", isin:"LU0705260189", ytd:3.53}
  ]},
  {name:"Multi Ativos", products:[
    {name:"BTG Pactual Sicav Balanced Fund", isin:"LU2451829373", ytd:1.89, minimum:"USD 1.000,00", redemption:"D+2/D+6"},
    {name:"Blackrock ESG Multi Asset", isin:"LU0494093205", ytd:9.17}
  ]},
  {name:"Alternativos Líquidos - Long Short Equity", products:[
    {name:"Pictet TR - Atlas", isin:"LU1433232003", ytd:3.65},
    {name:"Schroder GAIA Egerton", isin:"LU0548376150", ytd:2.60},
    {name:"AQR Delphi L/S Equity", isin:"LU1842781202", ytd:12.65}
  ]},
  {name:"Alternativos Líquidos - EUA Baixa Volatilidade", products:[
    {name:"JP Morgan US Hedged (Low Vol Fund)", isin:"LU1297690502", ytd:-0.15}
  ]},
  {name:"Alternativos Líquidos - Event Driven", products:[
    {name:"Blackrock Global Event Driven", isin:"LU1251620883", ytd:2.40}
  ]},
  {name:"Alternativos Líquidos - Multiestrategia", products:[
    {name:"Schroder GAIA Wellington Pagosa", isin:"LU1732474868", ytd:0.53}
  ]}
];

function renderFundCard(group, fund) {
  const performance = fund.ytd;
  const performanceClass = performance === undefined || performance === null || performance === 0
    ? "is-neutral"
    : performance > 0 ? "is-positive" : "is-negative";
  const performanceMarkup = fund.yield
    ? `<div class="metric"><span class="metric__value">Yield ${fund.yield}</span></div>`
    : performance !== undefined && performance !== null
      ? `<div class="metric"><span class="metric__value ${performanceClass}">${performance > 0 ? "+" : ""}${performance.toFixed(2)}%</span><span class="metric__label">Retorno 12M</span></div>`
      : "";
  const details = [
    `<div class="stat stat--full"><dt class="stat__label">ISIN</dt><dd class="stat__value">${fund.isin}</dd></div>`
  ];

  if (fund.minimum) details.push(`<div class="stat"><dt class="stat__label">Aporte mínimo</dt><dd class="stat__value">${fund.minimum}</dd></div>`);
  if (fund.redemption) details.push(`<div class="stat"><dt class="stat__label">Resgate</dt><dd class="stat__value">${fund.redemption}</dd></div>`);

  return `
    <article class="card">
      <div class="card__head">
        <span class="card__eyebrow">${group.name}</span>
        <h4 class="card__title card__title--sm">${fund.name}</h4>
      </div>
      ${performanceMarkup}
      <dl class="stats stats--2">${details.join("")}</dl>
    </article>`;
}

function renderFundBrowser(panel) {
  if (!panel) return;

  panel.innerHTML = `
    <div class="fund-browser">
      <nav class="fund-class-menu shop__list" role="tablist" aria-label="Temas de fundos de investimentos">
        ${fundGroups.map((group,index)=>`<button class="fund-class-tab side-sub${index===0?" is-active":""}" type="button" data-fund-class="${index}" aria-pressed="${index===0}" aria-selected="${index===0}">${group.name}</button>`).join("")}
      </nav>
      <div class="fund-class-content"></div>
    </div>`;

  const content = panel.querySelector(".fund-class-content");
  const classTabs = Array.from(panel.querySelectorAll(".fund-class-tab"));

  function renderGroup(index) {
    const group = fundGroups[index];
    content.innerHTML = `<h2 class="shop__title">${group.name}</h2><div class="info-note" role="note">Confira na plataforma as taxas atualizadas.</div><div class="grid grid--3">${
      group.products.map((fund)=>renderFundCard(group, fund)).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed","false");
        item.setAttribute("aria-selected","false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed","true");
      tab.setAttribute("aria-selected","true");
      renderGroup(Number(tab.dataset.fundClass));
    });
  });

  renderGroup(0);
}

renderFundBrowser(document.getElementById("fund-browser"));
renderFundBrowser(document.getElementById("us-fund-browser"));

const etfGroups = [
  {name:"Caixa e Curto Prazo", products:[
    ["iShares $ Treasury Bd 0-1yr ETF USD Acc","IB01","IE00BGSF1X88","0.07%","1.3%"],
    ["Amundi Smart Overnight Ret USD H ETF Acc","SMTC","LU1248511575","0.07%","1.5%"],
    ["iShares $ Treasury Bd 1-3yr ETF USD Acc","IBTA","IE00BYXPSP02","0.07%","0.4%"],
    ["Vanguard US Trsry 0-1 Yr Bd ETF USD Acc","VDST","IE00BLRPPV00","0.05%","1.2%"],
    ["iShares $ Treasury Bd 0-3 Mth ETF USD Acc","U03A","IE000SSFEUS3","0.07%","1.3%"]
  ]},
  {name:"Títulos do Tesouro EUA e Governo", products:[
    ["iShares $ Treasury Bd 3-7y ETF USD Acc","CSBGU7","IE00B3VWN393","0.07%","-0.2%"],
    ["iShares $ Treasury Bd 20+y ETF USD Acc","DTLA","IE00BFM6TC58","0.07%","-1.3%"],
    ["iShares $ Treasury Bd 7-10y ETF USD Acc","CSBGU0","IE00B3VWN518","0.07%","-0.6%"],
    ["iShares US Mortgage Backed Secs ETF $ Acc","IMBA","IE00BYXYYN70","0.28%","0.2%"],
    ["Vanguard USD Trs Bd ETF USD Acc","VDTA","IE00BGYWFS63","0.05%","-0.3%"]
  ]},
  {name:"Títulos Globais", products:[
    ["iShares Core Global Aggt Bd ETF USD HAcc","AGGU","IE00BZ043R46","0.10%","0.0%"],
    ["HSBC Global Aggregate Bond CH USD","HGAD","IE0007SZHO07","0.10%","0.1%"],
    ["HSBC Global Government Bond ETF CH USD","HGVU","IE0006NCFSW9","0.19%","-0.1%"],
    ["Vanguard Global Aggt Bd ETF USD H Acc","VAGU","IE00BG47KJ78","0.08%","-0.1%"],
    ["iShares Global Govt Bond ETF USD Acc","IGLA","IE00BYZ28V50","0.20%","-1.1%"]
  ]},
  {name:"Títulos Protegidos da Inflação", products:[
    ["iShares $ TIPS ETF USD Acc","ITPS","IE00B1FZSC47","0.10%","1.4%"],
    ["Amundi US TIPS Govt Infl-Lnkd Bd ETF Dist","TIPU","LU1452600270","0.05%","1.4%"],
    ["iShares Global Infl Lnkd Gov Bd ETF $ Acc","IGIL","IE00B3B8PX14","0.20%","1.3%"]
  ]},
  {name:"Corporativo Grau de Investimento", products:[
    ["iShares $ Short Dur Corp Bd ETF USD Acc","SDIA","IE00BYXYYP94","0.20%","0.7%"],
    ["iShares US Aggregate Bond ETF USD Acc","IUAA","IE00BYXYYM63","0.25%","-0.2%"],
    ["iShares $ Floating Rate Bd ETF USD Acc","FLOA","IE00BDFGJ627","0.10%","1.5%"]
  ]},
  {name:"High Yield", products:[
    ["iShares $ High Yld Corp Bd ETF USD Acc","IHYA","IE00BYXYYL56","0.50%","0.8%"],
    ["iShares Global HY Corp Bd ETF USD Acc","HYLA","IE00BYWZ0440","0.50%","0.7%"],
    ["iShares $ Short Dur HY Corp Bd ETF $ Acc","SDHA","IE00BZ17CN18","0.45%","1.2%"]
  ]},
  {name:"Títulos de Mercados Emergentes", products:[
    ["iShares JP Morgan $ EM Bd ETF USD Acc","JPEA","IE00BYXYYK40","0.45%","0.8%"],
    ["iShares JPMorgan EM Lcl Govt Bd ETF $ Acc","EMGA","IE00BFZPF546","0.50%","0.6%"],
    ["iShares JP Morgan Advcd $ EM Bd ETF $ Acc","EMSA","IE00BF553838","0.45%","0.7%"]
  ]},
  {name:"EUA Large-Cap Blend (S&P 500)", products:[
    ["iShares Core S&P 500 ETF USD Acc","CSSPX","IE00B5BMR087","0.07%","9.1%"],
    ["Vanguard S&P 500 ETF USD Acc","VUAA","IE00BFMXXD54","0.07%","9.1%"],
    ["Invesco S&P 500 ETF","SPXS","IE00B3YCGJ38","0.05%","9.2%"],
    ["iShares MSCI USA Scrn ETF USD Acc","SASU","IE00BFNM3G45","0.07%","8.5%"]
  ]},
  {name:"EUA Crescimento", products:[
    ["iShares NASDAQ 100 ETF USD Acc","CSNDX","IE00B53SZB19","0.30%","16.4%"],
    ["iShares Edge MSCI USA Momt Fac ETF $ Acc","IUMO","IE00BD1F4N50","0.20%","23.4%"],
    ["JPM US Growth Act UC ETF USD Acc","JGRO","IE0005CH3U28","0.00%","5.0%"]
  ]},
  {name:"EUA Valor", products:[
    ["iShares Edge MSCI USA Val Fac ETF $ Acc","IUVL","IE00BD1F4M44","0.20%","35.1%"],
    ["iShares Dow Jones Indust Avg ETF USD Acc","CSINDU","IE00B53L4350","0.33%","3.7%"]
  ]},
  {name:"EUA Small e Mid Cap", products:[
    ["iShares MSCI USA Sm Cp CTB Enh ESG ETF USD Acc","CSUSS","IE00B3VWM098","0.43%","12.4%"],
    ["iShares MSCI USA Md-Cp Eq Wgt UCITS ETF","IUSZ","IE00BD1F4K20","0.20%","4.9%"],
    ["JPMorgan BtBldrs US Sml Cp Eq ETF USD Acc","BBSC","IE000JNKVS10","0.00%","13.0%"]
  ]},
  {name:"Ações Globais (MSCI World, FTSE All-World)", products:[
    ["iShares Core MSCI World ETF USD Acc","IWDA","IE00B4L5Y983","0.20%","8.4%"],
    ["Vanguard FTSE All-World ETF USD Acc","VWRA","IE00BK5BQT80","0.19%","9.9%"],
    ["iShares MSCI ACWI ETF USD Acc","ISAC","IE00B6R52259","0.20%","9.9%"],
    ["Vanguard FTSE AllWld HiDivYld ETF USD Acc","VHYA","IE00BK5BR626","0.29%","9.8%"],
    ["Vanguard FTSE Dev World ETF USD Acc","VHVE","IE00BK5BQV03","0.12%","9.9%"]
  ]},
  {name:"Europa e Desenvolvidos ex-EUA", products:[
    ["Amundi Core Stoxx Eurp 600 ETF USD H Acc","MEUH","LU2873560564","0.04%","5.2%"],
    ["iShares Core FTSE 100 ETF USD H Acc","ISFD","IE00BYZ28W67","0.20%","5.1%"],
    ["Vanguard FTSE Japan ETF USD H Acc","VJPU","IE00BFMXZJ56","0.15%","17.8%"],
    ["iShares MSCI Canada ETF USD Acc","CCAU","IE00B52SF786","0.48%","7.0%"],
    ["iShares MSCI Australia ETF USD Acc","IAUS","IE00B5377D42","0.50%","10.8%"]
  ]},
  {name:"Japão", products:[
    ["iShares Core MSCI Japan IMI ETF USD Acc","IJPA","IE00B4L5YX21","0.12%","15.4%"],
    ["Vanguard FTSE Japan ETF USD Acc","VJPA","IE00BFMXYX26","0.10%","15.8%"],
    ["iShares MSCI Japan Scrn ETF USD Acc","SAJP","IE00BFNM3L97","0.15%","15.3%"],
    ["iShares MSCI Japan ETF USD Acc","CJPU","IE00B53QDK08","0.12%","15.4%"],
    ["JPM Japan Rsrch Enh Eq Act ETF USD Acc","JREJ","IE00BP2NF958","0.00%","15.6%"]
  ]},
  {name:"Mercados Emergentes", products:[
    ["iShares Core MSCI EM IMI ETF USD Acc","EIMI","IE00BKM4GZ66","0.18%","21.1%"],
    ["Amundi Core MSCI Emerg Mkts Swp ETF Acc","LEMA LN","LU2573967036","0.07%","22.2%"],
    ["iShares MSCI EM ETF USD Acc","IEMA","IE00B4L5YC18","0.18%","22.0%"],
    ["iShares MSCI EM IMI Scrn ETF USD Acc","SAEM","IE00BFNM3P36","0.18%","21.6%"],
    ["Vanguard FTSE Emerg Markets ETF USD Acc","VFEA","IE00BK5BR733","0.17%","10.2%"]
  ]},
  {name:"Ásia, China e Índia", products:[
    ["iShares MSCI EM Asia ETF USD Acc","CSEMAS","IE00B5L8K969","0.20%","25.0%"],
    ["iShares MSCI India ETF USD Acc","NDIA","IE00BZCQB185","0.65%","-13.1%"],
    ["iShares Core MSCI Pac ex-Jpn ETF USD Acc","CSPXJ","IE00B52MJY50","0.20%","10.4%"],
    ["iShares MSCI China A ETF USD Acc","CNYA","IE00BQT3WG13","0.40%","12.0%"],
    ["Amundi MSCI China ETF Acc","LCCN","LU1841731745","0.19%","-2.6%"]
  ]},
  {name:"Tecnologia", products:[
    ["iShares S&P 500 Info Tech Sect ETF $ Acc","IUIT","IE00B3WJKG14","0.15%","17.0%"],
    ["iShares Automation & Robotics ETF USD Acc","RBOT","IE00BYZK4552","0.40%","24.3%"],
    ["Amundi MSCI World Info Tech ETF USD Acc","TNOW","LU0533033741","0.20%","16.5%"],
    ["Invesco Technology S&P US Sel Sec ETF","XLKS","IE00B3VSSL01","0.14%","16.8%"],
    ["iShares Digital Security ETF USD Acc","LOCK","IE00BG0J4C88","0.40%","9.9%"]
  ]},
  {name:"Financeiro", products:[
    ["iShares S&P 500 Financials Sect ETF $ Acc","IUFS","IE00B4JNQZ49","0.15%","-6.5%"]
  ]},
  {name:"Saúde e Biotecnologia", products:[
    ["iShares S&P 500 Health Care Sect ETF $ Acc","IUHC","IE00B43HR379","0.15%","-4.9%"],
    ["iShares Healthcare Innov ETF USD Acc","HEAL","IE00BYZK4776","0.40%","-3.7%"],
    ["iShares Nasdaq US Biotech ETF USD Acc","BTEC","IE00BYXG2H39","0.35%","5.7%"],
    ["Amundi MSCI World HealthCare ETF USD Acc","HLTW","LU0533033311","0.20%","-4.7%"],
    ["iShares Ageing Population ETF USD Acc","AGED","IE00BYZK4669","0.40%","2.9%"]
  ]}
];

function renderEtfCard(group, product) {
  const performance = Number.parseFloat(product[4].replace(",", "."));
  const performanceClass = Number.isNaN(performance) || performance === 0
    ? "is-neutral"
    : performance > 0 ? "is-positive" : "is-negative";

  return `
    <article class="card">
      <div class="card__head">
        <span class="card__eyebrow">Categoria · ${group.name}</span>
        <span class="badge badge--ticker">Ticker · ${product[1]}</span>
        <h4 class="card__title card__title--sm">${product[0]}</h4>
      </div>
      <div class="metric">
        <span class="metric__value ${performanceClass}">${product[4]}</span>
        <span class="metric__label">Ano atual</span>
      </div>
      <dl class="stats stats--2">
        <div class="stat"><dt class="stat__label">Taxa anual</dt><dd class="stat__value">${product[3]}</dd></div>
        <div class="stat"><dt class="stat__label">ISIN</dt><dd class="stat__value">${product[2]}</dd></div>
      </dl>
    </article>`;
}

const etfPanel = document.getElementById("panel-etfs");

if (etfPanel) {
  etfPanel.innerHTML = `
    <div class="etf-browser">
    <nav class="etf-class-menu shop__list" role="tablist" aria-label="Classes de ETFs UCITS">
      ${etfGroups.map((group,index)=>`<button class="etf-class-tab side-sub${index===0?" is-active":""}" type="button" data-etf-class="${index}" aria-pressed="${index===0}" aria-selected="${index===0}">${group.name}</button>`).join("")}
    </nav>
      <div class="etf-class-content"></div>
    </div>`;

  const content = etfPanel.querySelector(".etf-class-content");
  const classTabs = Array.from(etfPanel.querySelectorAll(".etf-class-tab"));

  function renderEtfGroup(index) {
    const group = etfGroups[index];
    content.innerHTML = `<h2 class="shop__title">${group.name}</h2><div class="info-note" role="note">As taxas são indicativas. Confira na plataforma as taxas atualizadas.</div><div class="grid grid--3">${
      group.products.map((product)=>renderEtfCard(group, product)).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed","false");
        item.setAttribute("aria-selected","false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed","true");
      tab.setAttribute("aria-selected","true");
      renderEtfGroup(Number(tab.dataset.etfClass));
    });
  });

  renderEtfGroup(0);
}

const usLegacyEtfGroups = [
  {name:"Short Term Treasury", products:[
    ["iShares $ Treasury Bd 1-3yr ETF USD Acc","IBTA","IE00BYXPSP02","0.07%","+1.3%"],
    ["iShares $ Treasury Bd 1-3y ETF USD Dist","IDBT","IE00B14X4S71","0.07%","+1.3%"]
  ]},
  {name:"US Treasury", products:[
    ["iShares $ Treasury Bd 20+y ETF USD Acc","DTLA","IE00BFM6TC58","0.07%","-3.5%"],
    ["Vanguard USD Trs Bd ETF USD Acc","VDTA","IE00BGYWFS63","0.07%","-0.8%"],
    ["Invesco US Trs Bd 7-10 Yr ETF USD Dis","TREX","IE00BF2FN646","0.06%","-2.0%"],
    ["Invesco US Treasury Bond ETF USD Dis","TRES","IE00BF2GFH28","0.06%","-0.8%"]
  ]},
  {name:"Global Aggregate", products:[
    ["iShares Core Global Aggt Bd ETF USD Dist","AGGG","IE00B3F81409","0.10%","-1.4%"],
    ["Vanguard Global Aggt Bd ETF USD H Acc","VAGU","IE00BG47KJ78","0.10%","-0.2%"],
    ["State Street SPDR Bloomberg Global Aggregate Bond ETF","GLAG","IE00B43QJJ40","0.10%","-1.7%"],
    ["iShares Global Govt Bond ETF USD Acc","IGLA","IE00BYZ28V50","0.20%","-2.9%"]
  ]},
  {name:"Inflation Linked Short Duration", products:[
    ["iShares $ TIPS ETF USD Acc","IDTP","IE00B1FZSC47","0.10%","-0.9%"],
    ["Amundi US TIPS ETF Dist","TIPU","LU1452600270","0.18%","-0.9%"],
    ["iShares $ TIPS 0-5 ETF USD Dist","TIP5","IE00BDQYWQ65","0.10%","+0.9%"]
  ]},
  {name:"Short Duration Investment Grade", products:[
    ["iShares $ Short Dur Corp Bd ETF USD Acc","SDIA","IE00BYXYYP94","0.20%","+1.3%"],
    ["iShares $ Short Dur Corp Bd ETF USD Dist","SDIG","IE00BCRY5Y77","0.20%","+1.3%"]
  ]},
  {name:"Investment Grade", products:[
    ["iShares $ Corp Bond ETF USD Acc","LQDA","IE00BYXYYJ35","0.20%","-2.2%"],
    ["iShares Global Corp Bond ETF USD Dist","CORP","IE00B7J7TB45","0.20%","-2.2%"],
    ["iShares Global Corp Bond ETF USD Acc","CRPA","IE00BFM6TB42","0.20%","-2.2%"],
    ["iShares $ Floating Rate Bd ETF USD Acc","FLOA","IE00BDFGJ627","0.10%","+3.6%"]
  ]},
  {name:"High Yield", products:[
    ["iShares $ High Yld Corp Bd ETF USD Acc","IHYA","IE00BYXYYL56","0.50%","+0.3%"],
    ["iShares Global HY Corp Bd ETF USD Dist","HYLD","IE00B74DQ490","0.50%","-1.4%"],
    ["iShares Global HY Corp Bd ETF USD Acc","HYLA","IE00BYWZ0440","0.50%","-1.4%"]
  ]},
  {name:"Emerging Markets Sovereign", products:[
    ["iShares JP Morgan $ EM Bd ETF USD Acc","JPEA","IE00BYXYYK40","0.45%","-0.3%"],
    ["iShares JP Morgan Advcd $ EM Bd ETF $Acc","EMSA","IE00BF553838","0.45%","-0.5%"],
    ["iShares JP Morgan Advcd $ EM Bd ETF USD Dist","EMES","IE00BDDRDW15","0.45%","-0.5%"]
  ]}
];

function renderPlatformEtfs(panelId, groups, panelNotice) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  panel.innerHTML = `
    <div class="etf-browser">
      <nav class="etf-class-menu shop__list" role="tablist" aria-label="Classes de ETFs UCITS">
        ${groups.map((group,index)=>`<button class="etf-class-tab side-sub${index===0?" is-active":""}" type="button" data-platform-etf-class="${index}" aria-pressed="${index===0}" aria-selected="${index===0}">${group.name}</button>`).join("")}
      </nav>
      <div class="etf-class-content"></div>
    </div>`;

  const content = panel.querySelector(".etf-class-content");
  const classTabs = Array.from(panel.querySelectorAll(".etf-class-tab"));

  function render(index) {
    const group = groups[index];
    content.innerHTML = `<h2 class="shop__title">${group.name}</h2><div class="info-note" role="note">${panelNotice}</div><div class="grid grid--3">${
      group.products.map((product)=>renderEtfCard(group, product)).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed","false");
        item.setAttribute("aria-selected","false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed","true");
      tab.setAttribute("aria-selected","true");
      render(Number(tab.dataset.platformEtfClass));
    });
  });

  render(0);
}

function mergeUsEtfsWithReference() {
  const groups = etfGroups.map((group)=>({...group,products:[...group.products]}));
  const groupsByName = new Map(groups.map((group)=>[group.name,group]));
  const isins = new Set(groups.flatMap((group)=>group.products.map((product)=>product[2])));
  const legacyCategories = {
    "Short Term Treasury":"Caixa e Curto Prazo",
    "US Treasury":"Títulos do Tesouro EUA e Governo",
    "Global Aggregate":"Títulos Globais",
    "Inflation Linked Short Duration":"Títulos Protegidos da Inflação",
    "Short Duration Investment Grade":"Corporativo Grau de Investimento",
    "Investment Grade":"Corporativo Grau de Investimento",
    "High Yield":"High Yield",
    "Emerging Markets Sovereign":"Títulos de Mercados Emergentes"
  };

  usLegacyEtfGroups.forEach((legacyGroup)=>{
    const category = legacyCategories[legacyGroup.name];
    const target = groupsByName.get(category);
    if (!target) throw new Error(`Categoria UCITS sem correspondência: ${legacyGroup.name}`);

    legacyGroup.products.forEach((product)=>{
      if (!isins.has(product[2])) {
        target.products.push(product);
        isins.add(product[2]);
      }
    });
  });

  return groups;
}

function reorderPlatformEtfGroups(groups, order, rotation) {
  const groupsByName = new Map(groups.map((group)=>[group.name,group]));

  return order.map((name,index)=>{
    const group = groupsByName.get(name);
    if (!group) throw new Error(`Categoria UCITS ausente: ${name}`);

    const shift = group.products.length > 1 ? (index + rotation) % group.products.length : 0;
    return {
      name:group.name,
      products:[...group.products.slice(shift),...group.products.slice(0,shift)]
    };
  });
}

const usEtfGroupOrder = [
  "EUA Large-Cap Blend (S&P 500)",
  "EUA Crescimento",
  "Ações Globais (MSCI World, FTSE All-World)",
  "Títulos do Tesouro EUA e Governo",
  "Caixa e Curto Prazo",
  "EUA Valor",
  "Corporativo Grau de Investimento",
  "Japão",
  "Títulos Globais",
  "Mercados Emergentes",
  "High Yield",
  "Ásia, China e Índia",
  "EUA Small e Mid Cap",
  "Títulos Protegidos da Inflação",
  "Europa e Desenvolvidos ex-EUA",
  "Títulos de Mercados Emergentes",
  "Tecnologia",
  "Financeiro",
  "Saúde e Biotecnologia"
];

const europaEtfGroupOrder = [
  "Ações Globais (MSCI World, FTSE All-World)",
  "Títulos Globais",
  "Europa e Desenvolvidos ex-EUA",
  "Caixa e Curto Prazo",
  "Mercados Emergentes",
  "Títulos do Tesouro EUA e Governo",
  "Japão",
  "Tecnologia",
  "Corporativo Grau de Investimento",
  "EUA Large-Cap Blend (S&P 500)",
  "High Yield",
  "Ásia, China e Índia",
  "EUA Crescimento",
  "Títulos Protegidos da Inflação",
  "EUA Valor",
  "Títulos de Mercados Emergentes",
  "Financeiro",
  "Saúde e Biotecnologia",
  "EUA Small e Mid Cap"
];

const usEtfGroups = reorderPlatformEtfGroups(mergeUsEtfsWithReference(), usEtfGroupOrder, 1);
const europaEtfGroups = reorderPlatformEtfGroups(etfGroups, europaEtfGroupOrder, 2);

renderPlatformEtfs("us-panel-etfs", usEtfGroups, "Confira na plataforma as taxas atualizadas.");
renderPlatformEtfs("europa-panel-etfs", europaEtfGroups, "Confira na plataforma as taxas atualizadas.");

const fixedIncomeGroups = [
  {name:"Títulos Soberanos", products:[
    ["United States of America","Governo (Soberano)","T","4.250%","15/01/2028","4.21%","1.21","Aa1 / - / AA+u","100","70.744 MM","EUA","US91282CMF58"],
    ["United States of America","Governo (Soberano)","T","3.500%","15/12/2028","4.46%","2.05","Aa1 / - / AA+u","100","57.955 MM","EUA","US91282CPP04"],
    ["United States of America","Governo (Soberano)","T","4.125%","30/11/2029","4.60%","2.87","Aa1 / - / AA+u","100","74.761 MM","EUA","US91282CMA61"],
    ["United States of America","Governo (Soberano)","T","3.625%","31/10/2030","4.69%","3.65","Aa1 / - / AA+u","100","73.302 MM","EUA","US91282CPD73"],
    ["United States of America","Governo (Soberano)","T","1.380%","15/11/2031","4.78%","4.77","Aa1 / - / AA+u","100","144.572 MM","EUA","US91282CDJ71"],
    ["United States of America","Governo (Soberano)","T","3.750%","31/10/2032","4.81%","5.22","Aa1 / - / AA+u","100","46.526 MM","EUA","US91282CPF22"],
    ["United States of America","Governo (Soberano)","T","4.250%","30/06/2033","4.87%","5.68","Aa1 / - / AA+u","100","50.587 MM","EUA","US91282CQW46"],
    ["United States of America","Governo (Soberano)","T","4.375%","15/05/2036","5.04%","7.53","Aa1 / - / AA+u","100","134.018 MM","EUA","US91282CQQ77"]
  ]},
  {name:"Títulos Corporativos", products:[
    ["Costco Wholesale Corp","Retail","COST","1.600%","20/04/2030","89.37","4.92%","3.33","Aa3 / AA / AA","Sr Unsecured","EUA","2.000","1.750 MM","US22160KAP03"],
    ["Walt Disney Co/The","Media","DIS","2.650%","13/01/2031","90.45","5.18%","3.91","A2 / A / WD","Sr Unsecured","EUA","2.000","2.500 MM","US254687FX90"],
    ["Coca-Cola Co/The","Beverages","KO","1.375%","15/03/2031","85.53","5.06%","4.19","A1 / A+ / WD","Sr Unsecured","EUA","2.000","1.300 MM","US191216DE73"],
    ["HCA Healthcare Inc","Healthcare-Services","HCA","5.450%","01/04/2031","99.48","5.58%","3.92","Baa2 / BBB / -","Sr Unsecured","EUA","2.000","1.750 MM","US404119CT49"],
    ["Berkshire Hathaway Inc","Insurance","BRK","2.875%","15/03/2032","89.47","5.12%","4.90","Aa2 / AA / A+u","Sr Unsecured","EUA","2.000","1.000 MM","US084664DA63"],
    ["Bank of America Corp","Banks","BAC","4.695%","23/04/2032","96.38","5.51%","3.93","A1 / A- / AA-","Sr Unsecured","EUA","2.000","3.250 MM","US06051GNA30"],
    ["Dell Technologies Inc","Computers","DELL","4.750%","06/10/2032","95.18","5.71%","5.11","Baa2 / BBB+ / BBB+","Sr Unsecured","EUA","2.000","1.250 MM","US24703DBT72"],
    ["Morgan Stanley","Banks","MS","6.342%","18/10/2033","102.50","5.84%","4.82","A1 / A- / A+","Sr Unsecured","EUA","1.000","3.000 MM","US61747YEY77"],
    ["Eli Lilly & Co","Pharmaceuticals","LLY","4.650%","20/05/2033","95.57","5.46%","5.49","Aa3 / AA- / -","Sr Unsecured","EUA","2.000","1.250 MM","US532457DM76"],
    ["Alphabet Inc","Internet","GOOGL","5.200%","15/08/2033","97.71","5.61%","5.62","Aa2 / AA+ / -","Sr Unsecured","EUA","2.000","2.500 MM","US02079KCR68"],
    ["Goldman Sachs Group","Banks","GS","5.094%","20/04/2034","95.18","5.92%","5.31","A2 / BBB+ / A","Sr Unsecured","EUA","1.000","3.000 MM","US38141GF251"],
    ["T-Mobile US Inc","Telecommunications","TMUS","5.300%","15/05/2035","94.74","6.09%","6.60","Baa1 / BBB+ / BBB+","Sr Unsecured","EUA","2.000","1.000 MM","US87264ADT97"],
    ["Amazon.com Inc","Internet","AMZN","4.875%","13/03/2036","92.15","5.98%","7.32","A1 / AA / AA-","Sr Unsecured","EUA","2.000","1.748 MM","US023135DF00"],
    ["NVIDIA Corp","Semiconductors","NVDA","4.950%","15/06/2036","92.77","5.94%","7.37","Aa1 / AA / -","Sr Unsecured","EUA","2.000","4.000 MM","US67066GAT13"]
  ]},
  {name:"Títulos Corporativos Emergentes", products:[
    ["PRIO SA/Brazil","Oil & Gas","PRIOBZ","6.750%","15/10/2030","98.21","7.28%","3.37","Ba2 / - / BB+","Sr Unsecured","LU","200.000","700 MM","USL7S62BAA03"],
    ["LD Celulose SA","Pulp & Paper","LNZAV","7.950%","26/01/2032","102.85","7.15%","3.47","Ba3 / - / BB","Secured / 1st lien","AT","200.000","650 MM","USA4S42PAA32"],
    ["FS Industria De Biocomb","Alternate Energy","FSBIOE","8.625%","25/06/2033","92.80","10.14%","4.71","B1 / - / B+","Sr Unsecured","LU","200.000","500 MM","USL40756AG06"],
    ["Minerva SA/Brazil","Food","BEEFBZ","8.875%","13/09/2033","92.95","10.33%","4.87","- / BB / BB","Sr Unsecured","LU","200.000","1.000 MM","USL6401PAM51"],
    ["Grupo Nutresa SA","Food","NUTRES","9.000%","12/05/2035","106.06","7.99%","5.60","Baa3 / - / BB+","Sr Unsecured","CO","200.000","1.500 MM","USP4R21KAB22"],
    ["BBVA Mexico SA","Banks","BBVASM","8.125%","08/01/2039","103.25","7.53%","5.26","Baa3 / - / BB+","Subordinated","US","200.000","900 MM","USP1S81BAB48"]
  ]}
];

const europaFixedIncomeGroups = [
  {name:"Títulos Corporativos", products:[
    ["Morgan Stanley","Bancos","MS","4.656%","02/03/2029","101.02","3.83%","1.21","A1 / A- / A+","Sr Unsecured","US","100.000","2.000 MM","XS2595028536"],
    ["RTX Corp","Aeroespacial / Defesa","RTX","2.150%","18/05/2030","94.52","3.84%","3.25","Baa1 / BBB+ / -","Sr Unsecured","US","100.000","500 MM","XS1822302193"],
    ["Netflix Inc","Internet","NFLX","3.625%","15/06/2030","99.40","3.84%","3.29","A2 / A / -","Sr Unsecured","US","100.000","1.100 MM","XS2072829794"],
    ["International Business Machines","Computadores","IBM","3.625%","06/02/2031","98.54","4.00%","3.74","A3 / A- / A-","Sr Unsecured","US","100.000","1.250 MM","XS2583742239"],
    ["Carlsberg Breweries","Bebidas","CARLB","3.250%","28/02/2032","96.41","4.01%","4.64","Baa1 / - / BBB+","Sr Unsecured","DK","100.000","1.000 MM","XS3002420498"],
    ["EssilorLuxottica SA","Produtos de Saúde","EFFP","3.000%","05/03/2032","96.25","3.79%","4.70","A1 / A+ / -","Sr Unsecured","FR","100.000","750 MM","FR001400RX89"],
    ["Anglo American PLC","Mineração","AALLN","4.125%","15/03/2032","99.72","4.18%","4.58","Baa2 / BBB / BBB+","Sr Unsecured","GB","100.000","750 MM","XS2779901482"],
    ["British American Tobacco PLC","Agricultura","BATSLN","4.125%","12/04/2032","99.53","4.22%","4.65","Baa1 / BBB+ / A-","Sr Unsecured","GB","100.000","900 MM","XS2801975991"],
    ["Crédit Agricole SA","Bancos","ACAFP","3.250%","25/08/2032","95.41","4.30%","4.28","A3 / A- / A+","Sr Non Preferred","FR","100.000","1.250 MM","FR0014012AJ0"],
    ["Glencore International AG","Mineração","GLENLN","3.668%","06/10/2032","96.43","4.37%","5.15","A3 / BBB+ / -","Sr Unsecured","IE","100.000","500 MM","XS3194155563"],
    ["Carrier Global Corp","Materiais de Construção","CARR","4.500%","29/11/2032","101.79","4.15%","4.82","Baa1 / BBB+ / WD","Sr Unsecured","US","100.000","839 MM","XS2751689048"],
    ["McDonald's Corp","Varejo","MCD","3.500%","21/05/2032","97.34","4.04%","4.83","Baa1 / BBB+ / -","Sr Unsecured","US","100.000","1.250 MM","XS3072348405"],
    ["T-Mobile US Inc","Telecomunicações","TMUS","3.150%","11/02/2032","95.10","4.21%","4.60","Baa1 / BBB+ / BBB+","Sr Unsecured","US","100.000","1.000 MM","XS2997534768"],
    ["Vinci SA","Engenharia e Construção","DGFP","3.375%","17/10/2032","96.83","3.98%","5.24","A3 / A- / A-u","Sr Unsecured","FR","100.000","825 MM","FR001400D8K2"],
    ["Meta Platforms Inc","Internet","META","4.650%","15/02/2033","100.45","4.57%","5.33","Aa3 / AA- / -","Sr Unsecured","US","100.000","1.250 MM","XS3552752480"],
    ["Danone SA","Alimentos","BNFP","3.438%","07/04/2033","96.69","4.03%","5.50","Baa1 / BBB+ / -","Sr Unsecured","FR","100.000","800 MM","FR001400YP56"],
    ["Bayer AG","Farmacêuticos","BAYNGR","4.625%","26/05/2033","102.45","4.17%","5.28","Baa2 / BBB / BBB","Sr Unsecured","DE","1.000","1.500 MM","XS2630111719"],
    ["UBS Group AG","Bancos","UBS","4.125%","09/06/2033","99.76","4.17%","4.81","A2 / A- / A+","Sr Unsecured","CH","200.000","1.250 MM","CH1305916897"],
    ["Iberdrola SA","Energia Elétrica","IBESM","3.500%","16/05/2035","96.18","4.04%","7.07","Baa1 / BBB+ / A-","Sr Unsecured","ES","100.000","750 MM","XS3072230744"],
    ["Coca-Cola Co/The","Bebidas","KO","3.375%","15/08/2037","93.76","4.10%","8.70","A1 / A+ / -","Sr Unsecured","US","100.000","500 MM","XS2874154946"]
  ]}
];

function renderFixedIncomeCard(product, isSovereign, pieceLabel = "Peça", durationLabel = "Duration") {
  const issuer = product[0];
  const sector = product[1];
  const symbol = product[2];
  const coupon = product[3];
  const maturity = product[4];
  const price = isSovereign ? product[8] : product[5];
  const yieldToWorst = isSovereign ? product[5] : product[6];
  const duration = isSovereign ? product[6] : product[7];
  const rating = isSovereign ? product[7] : product[8];
  const isin = isSovereign ? product[11] : product[13];
  const details = isSovereign
    ? `
        <div class="stat"><span class="stat__label">${durationLabel}</span><span class="stat__value">${duration}</span></div>
        <div class="stat"><span class="stat__label">Rating</span><span class="stat__value">${rating}</span></div>
        <div class="stat"><span class="stat__label">Tipo</span><span class="stat__value">Soberano</span></div>
        <div class="stat"><span class="stat__label">Preço</span><span class="stat__value">${price}</span></div>
        <div class="stat"><span class="stat__label">Emissão</span><span class="stat__value">${product[9]}</span></div>
        <div class="stat"><span class="stat__label">País</span><span class="stat__value">${product[10]}</span></div>`
    : `
        <div class="stat"><span class="stat__label">Preço</span><span class="stat__value">${price}</span></div>
        <div class="stat"><span class="stat__label">${durationLabel}</span><span class="stat__value">${duration}</span></div>
        <div class="stat"><span class="stat__label">Rating</span><span class="stat__value">${rating}</span></div>
        <div class="stat"><span class="stat__label">Senioridade</span><span class="stat__value">${product[9]}</span></div>
        <div class="stat"><span class="stat__label">País / Listing</span><span class="stat__value">${product[10]}</span></div>
        <div class="stat"><span class="stat__label">${pieceLabel}</span><span class="stat__value">${product[11]}</span></div>
        <div class="stat"><span class="stat__label">Emissão</span><span class="stat__value">${product[12]}</span></div>`;

  return `
    <article class="fixed-income-card card">
      <div class="card__head">
        <span class="card__eyebrow">${issuer} · Setor: ${sector}</span>
        <h4 class="card__title">${symbol} · ${coupon} · ${maturity}</h4>
        <span class="badge">${rating}</span>
      </div>
      <div class="metric">
        <span class="metric__value is-positive">${yieldToWorst}</span>
        <span class="metric__label">${isSovereign ? "YTW / Retorno indicativo" : "YTW"}</span>
      </div>
      <div class="stats fixed-income-primary-stats">
        <div class="stat"><span class="stat__label">Cupom</span><span class="stat__value">${coupon}</span></div>
        <div class="stat"><span class="stat__label">Vencimento</span><span class="stat__value">${maturity}</span></div>
        <div class="stat"><span class="stat__label">Símbolo</span><span class="stat__value">${symbol}</span></div>
        <div class="stat stat--full"><span class="stat__label">ISIN</span><span class="isin">${isin}</span></div>
      </div>
      <details class="details">
        <summary>Ver detalhes</summary>
        <div class="details__body">
          ${details}
          <div class="stat stat--full"><span class="stat__label">ISIN</span><span class="isin">${isin}</span></div>
        </div>
      </details>
    </article>`;
}

const fixedIncomePanel = document.getElementById("panel-renda-fixa") || document.getElementById("us-panel-renda-fixa");

if (fixedIncomePanel) {
  fixedIncomePanel.innerHTML = `
    <div class="fixed-income-browser">
      <nav class="fixed-income-class-menu shop__list" role="tablist" aria-label="Classes de renda fixa internacional">
        ${fixedIncomeGroups.map((group,index)=>`<button class="fixed-income-class-tab side-sub${index===0?" is-active":""}" type="button" data-fixed-income-class="${index}" aria-pressed="${index===0}" aria-selected="${index===0}">${group.name}</button>`).join("")}
      </nav>
      <div class="fixed-income-class-content"></div>
    </div>`;

  const content = fixedIncomePanel.querySelector(".fixed-income-class-content");
  const classTabs = Array.from(fixedIncomePanel.querySelectorAll(".fixed-income-class-tab"));

  function renderFixedIncomeGroup(index) {
    const group = fixedIncomeGroups[index];
    content.innerHTML = `<h2 class="shop__title">${group.name}</h2><div class="info-note" role="note">As taxas são indicativas. Confira na plataforma as taxas atualizadas.</div><div class="fixed-income-products grid grid--3">${
      group.products.map((product)=>renderFixedIncomeCard(product, index === 0)).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed","false");
        item.setAttribute("aria-selected","false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed","true");
      tab.setAttribute("aria-selected","true");
      renderFixedIncomeGroup(Number(tab.dataset.fixedIncomeClass));
    });
  });

  renderFixedIncomeGroup(0);
}

const europaFixedIncomePanel = document.getElementById("europa-panel-renda-fixa");

if (europaFixedIncomePanel) {
  europaFixedIncomePanel.innerHTML = `
    <div class="fixed-income-browser">
      <nav class="fixed-income-class-menu shop__list" role="tablist" aria-label="Classes de renda fixa internacional">
        ${europaFixedIncomeGroups.map((group,index)=>`<button class="fixed-income-class-tab side-sub${index===0?" is-active":""}" type="button" data-europa-fixed-income-class="${index}" aria-pressed="${index===0}" aria-selected="${index===0}">${group.name}</button>`).join("")}
      </nav>
      <div class="fixed-income-class-content"></div>
    </div>`;

  const content = europaFixedIncomePanel.querySelector(".fixed-income-class-content");
  const classTabs = Array.from(europaFixedIncomePanel.querySelectorAll(".fixed-income-class-tab"));

  function renderEuropaFixedIncomeGroup(index) {
    const group = europaFixedIncomeGroups[index];
    content.innerHTML = `<h2 class="shop__title">${group.name}</h2><div class="info-note" role="note">Preços indicativos. Confira as taxas atualizadas junto aos bankers do BTG Europa.</div><div class="fixed-income-products grid grid--3">${
      group.products.map((product)=>renderFixedIncomeCard(product, false, "Peça mínima", "Duration modificada")).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed","false");
        item.setAttribute("aria-selected","false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed","true");
      tab.setAttribute("aria-selected","true");
      renderEuropaFixedIncomeGroup(Number(tab.dataset.europaFixedIncomeClass));
    });
  });

  renderEuropaFixedIncomeGroup(0);
}

document.querySelectorAll(".shop").forEach((shop)=>{
  const subcategoryAside = shop.querySelector(".shop__subs");
  const subcategoryContent = shop.querySelector(".shop__subs-content");
  const productTabs = Array.from(shop.querySelectorAll(".shop__products [role='tab']"));

  if (!subcategoryAside || !subcategoryContent) {
    shop.classList.add("shop--no-categories");
    return;
  }

  shop.querySelectorAll(".product-panel").forEach((panel)=>{
    const browser = panel.querySelector(".fund-browser, .etf-browser, .fixed-income-browser");
    if (!browser) return;

    const menu = browser.querySelector(".fund-class-menu, .etf-class-menu, .fixed-income-class-menu");
    const content = browser.querySelector(".fund-class-content, .etf-class-content, .fixed-income-class-content");
    if (!menu || !content) return;

    const menuGroup = document.createElement("div");
    menuGroup.className = "shop-category-list";
    menuGroup.dataset.productPanel = panel.id;
    menuGroup.hidden = true;
    menuGroup.append(menu);
    subcategoryContent.append(menuGroup);
    content.classList.add("shop__content");
    panel.replaceChildren(content);
  });

  function updateShopCategories() {
    const activeTab = productTabs.find((tab)=>tab.getAttribute("aria-selected")==="true");
    const activePanelId = activeTab?.getAttribute("aria-controls");
    const menuGroups = Array.from(subcategoryContent.children);
    const hasCategories = menuGroups.some((group)=>group.dataset.productPanel===activePanelId);

    menuGroups.forEach((group)=>{
      group.hidden = group.dataset.productPanel!==activePanelId;
    });
    subcategoryAside.hidden = !hasCategories;
    shop.classList.toggle("shop--no-categories", !hasCategories);
  }

  productTabs.forEach((tab)=>tab.addEventListener("click",updateShopCategories));
  updateShopCategories();
});
