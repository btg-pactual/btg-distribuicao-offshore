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

const etfPanel = document.getElementById("panel-etfs");

if (etfPanel) {
  etfPanel.innerHTML = `
    <div class="etf-browser">
      <aside class="etf-class-menu" aria-label="Classes de ETFs UCITS">
        ${etfGroups.map((group,index)=>`<button class="etf-class-tab${index===0?" active":""}" type="button" data-etf-class="${index}" aria-pressed="${index===0}">${group.name}</button>`).join("")}
      </aside>
      <div class="etf-class-content"></div>
    </div>`;

  const content = etfPanel.querySelector(".etf-class-content");
  const classTabs = Array.from(etfPanel.querySelectorAll(".etf-class-tab"));

  function renderEtfGroup(index) {
    const group = etfGroups[index];
    content.innerHTML = `<div class="etf-group-head"><h3>${group.name}</h3></div><p class="product-rate-notice">As taxas são indicativas. Confira na plataforma as taxas atualizadas.</p><div class="etf-products">${
      group.products.map((product)=>`
        <article class="etf-card">
          <h4>${product[0]}</h4>
          <dl class="etf-details">
            <div><dt>Categoria</dt><dd>${group.name}</dd></div>
            <div><dt>Ticker</dt><dd>${product[1]}</dd></div>
            <div><dt>ISIN</dt><dd>${product[2]}</dd></div>
            <div><dt>Taxa anual</dt><dd>${product[3]}</dd></div>
            <div><dt>Ano atual</dt><dd>${product[4]}</dd></div>
          </dl>
        </article>`).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("active");
        item.setAttribute("aria-pressed","false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-pressed","true");
      renderEtfGroup(Number(tab.dataset.etfClass));
    });
  });

  renderEtfGroup(0);
}

const usEtfGroups = [
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

function renderPlatformEtfs(panelId, groups, currencyNotice) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  panel.innerHTML = `
    <div class="etf-browser">
      <aside class="etf-class-menu" aria-label="Classes de ETFs UCITS">
        ${groups.map((group,index)=>`<button class="etf-class-tab${index===0?" active":""}" type="button" data-platform-etf-class="${index}" aria-pressed="${index===0}">${group.name}</button>`).join("")}
      </aside>
      <div class="etf-class-content"></div>
    </div>`;

  const content = panel.querySelector(".etf-class-content");
  const classTabs = Array.from(panel.querySelectorAll(".etf-class-tab"));

  function render(index) {
    const group = groups[index];
    content.innerHTML = `<div class="etf-group-head"><h3>${group.name}</h3></div><p class="product-rate-notice">${currencyNotice}</p><div class="etf-products">${
      group.products.map((product)=>`
        <article class="etf-card">
          <h4>${product[0]}</h4>
          <dl class="etf-details">
            <div><dt>Categoria</dt><dd>${group.name}</dd></div>
            <div><dt>Ticker</dt><dd>${product[1]}</dd></div>
            <div><dt>ISIN</dt><dd>${product[2]}</dd></div>
            <div><dt>Taxa anual</dt><dd>${product[3]}</dd></div>
            <div><dt>Ano atual</dt><dd>${product[4]}</dd></div>
          </dl>
        </article>`).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("active");
        item.setAttribute("aria-pressed","false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-pressed","true");
      render(Number(tab.dataset.platformEtfClass));
    });
  });

  render(0);
}

const europaEtfGroups = [
  {name:"Short Term Treasury", products:[["iShares $ Treasury Bond 1-3yr UCITS ETF","IBTE","IE00BDFK1573","Não informado","Não informado"]]},
  {name:"US Treasury", products:[["Vanguard USD Treasury Bond UCITS ETF","VDTE","IE00BMX0B631","Não informado","Não informado"]]},
  {name:"Global Aggregate", products:[["iShares Core Global Agg Bond UCITS ETF","AGGH","IE00BDBRDM35","Não informado","Não informado"]]},
  {name:"Inflation Linked Short Duration", products:[["iShares $ TIPS 0-5 UCITS ETF","CBUL","IE000WIQIPT2","Não informado","Não informado"]]},
  {name:"Short Duration Investment Grade", products:[["iShares $ Short Dur Corp Bond UCITS ETF","CEBU","IE000AWT6D61","Não informado","Não informado"]]},
  {name:"Investment Grade", products:[["iShares $ Corp Bond UCITS ETF","LQEE","IE00BF3N6Y61","Não informado","Não informado"]]},
  {name:"High Yield", products:[["iShares $ High Yield Corp Bond UCITS ETF","IHYE","IE00BF3N7102","Não informado","Não informado"]]},
  {name:"Emerging Markets Sovereign", products:[["iShares J.P. Morgan $ EM Bond UCITS ETF","3SUD","IE00BJ5JPH63","Não informado","Não informado"]]}
];

renderPlatformEtfs("us-panel-etfs", usEtfGroups, "ETF UCITS offshore em USD. As taxas e retornos devem ser confirmados na plataforma.");
renderPlatformEtfs("europa-panel-etfs", europaEtfGroups, "ETF UCITS offshore em EUR com hedge cambial. Taxas e retornos não informados na fonte consultada; confira na plataforma.");

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

const fixedIncomePanel = document.getElementById("panel-renda-fixa") || document.getElementById("us-panel-renda-fixa");

if (fixedIncomePanel) {
  fixedIncomePanel.innerHTML = `
    <div class="fixed-income-browser">
      <aside class="fixed-income-class-menu" aria-label="Classes de renda fixa internacional">
        ${fixedIncomeGroups.map((group,index)=>`<button class="fixed-income-class-tab${index===0?" active":""}" type="button" data-fixed-income-class="${index}" aria-pressed="${index===0}">${group.name}</button>`).join("")}
      </aside>
      <div class="fixed-income-class-content"></div>
    </div>`;

  const content = fixedIncomePanel.querySelector(".fixed-income-class-content");
  const classTabs = Array.from(fixedIncomePanel.querySelectorAll(".fixed-income-class-tab"));

  function renderFixedIncomeGroup(index) {
    const group = fixedIncomeGroups[index];
    content.innerHTML = `<div class="fixed-income-group-head"><h3>${group.name}</h3></div><p class="product-rate-notice">As taxas são indicativas. Confira na plataforma as taxas atualizadas.</p><div class="fixed-income-products">${
      group.products.map((product)=>`
        <article class="fixed-income-card">
          <h4>${product[0]}</h4>
          <dl class="fixed-income-details">
            <div><dt>Setor</dt><dd>${product[1]}</dd></div>
            <div><dt>Símbolo</dt><dd>${product[2]}</dd></div>
            <div><dt>Cupom</dt><dd>${product[3]}</dd></div>
            ${index === 0 ? `
            <div><dt>Vencimento</dt><dd>${product[4]}</dd></div>
            <div><dt>YTW / Retorno indicativo</dt><dd>${product[5]}</dd></div>
            <div><dt>Duration</dt><dd>${product[6]}</dd></div>
            <div><dt>Rating</dt><dd>${product[7]}</dd></div>
            <div><dt>Tipo</dt><dd>Soberano</dd></div>
            <div><dt>Preço</dt><dd>${product[8]}</dd></div>
            <div><dt>Emissão</dt><dd>${product[9]}</dd></div>
            <div><dt>País</dt><dd>${product[10]}</dd></div>
            <div><dt>ISIN</dt><dd>${product[11]}</dd></div>
            ` : `
            <div><dt>Vencimento</dt><dd>${product[4]}</dd></div>
            <div><dt>Preço</dt><dd>${product[5]}</dd></div>
            <div><dt>YTW</dt><dd>${product[6]}</dd></div>
            <div><dt>Duration</dt><dd>${product[7]}</dd></div>
            <div><dt>Rating</dt><dd>${product[8]}</dd></div>
            <div><dt>Senioridade</dt><dd>${product[9]}</dd></div>
            <div><dt>País / Listing</dt><dd>${product[10]}</dd></div>
            <div><dt>Peça</dt><dd>${product[11]}</dd></div>
            <div><dt>Emissão</dt><dd>${product[12]}</dd></div>
            <div><dt>ISIN</dt><dd>${product[13]}</dd></div>
            `}
          </dl>
        </article>`).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("active");
        item.setAttribute("aria-pressed","false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-pressed","true");
      renderFixedIncomeGroup(Number(tab.dataset.fixedIncomeClass));
    });
  });

  renderFixedIncomeGroup(0);
}

const europaFixedIncomePanel = document.getElementById("europa-panel-renda-fixa");

if (europaFixedIncomePanel) {
  europaFixedIncomePanel.innerHTML = `
    <div class="fixed-income-browser">
      <aside class="fixed-income-class-menu" aria-label="Classes de renda fixa internacional">
        ${europaFixedIncomeGroups.map((group,index)=>`<button class="fixed-income-class-tab${index===0?" active":""}" type="button" data-europa-fixed-income-class="${index}" aria-pressed="${index===0}">${group.name}</button>`).join("")}
      </aside>
      <div class="fixed-income-class-content"></div>
    </div>`;

  const content = europaFixedIncomePanel.querySelector(".fixed-income-class-content");
  const classTabs = Array.from(europaFixedIncomePanel.querySelectorAll(".fixed-income-class-tab"));

  function renderEuropaFixedIncomeGroup(index) {
    const group = europaFixedIncomeGroups[index];
    content.innerHTML = `<div class="fixed-income-group-head"><h3>${group.name}</h3></div><p class="product-rate-notice">Preços indicativos. Confira as taxas atualizadas junto aos bankers do BTG Europa.</p><div class="fixed-income-products">${
      group.products.map((product)=>`
        <article class="fixed-income-card">
          <h4>${product[0]}</h4>
          <dl class="fixed-income-details">
            <div><dt>Setor</dt><dd>${product[1]}</dd></div>
            <div><dt>Símbolo</dt><dd>${product[2]}</dd></div>
            <div><dt>Cupom</dt><dd>${product[3]}</dd></div>
            <div><dt>Vencimento</dt><dd>${product[4]}</dd></div>
            <div><dt>Preço</dt><dd>${product[5]}</dd></div>
            <div><dt>YTW</dt><dd>${product[6]}</dd></div>
            <div><dt>Duration modificada</dt><dd>${product[7]}</dd></div>
            <div><dt>Rating</dt><dd>${product[8]}</dd></div>
            <div><dt>Senioridade</dt><dd>${product[9]}</dd></div>
            <div><dt>País / Listing</dt><dd>${product[10]}</dd></div>
            <div><dt>Peça mínima</dt><dd>${product[11]}</dd></div>
            <div><dt>Emissão</dt><dd>${product[12]}</dd></div>
            <div><dt>ISIN</dt><dd>${product[13]}</dd></div>
          </dl>
        </article>`).join("")
    }</div>`;
  }

  classTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
      classTabs.forEach((item)=>{
        item.classList.remove("active");
        item.setAttribute("aria-pressed","false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-pressed","true");
      renderEuropaFixedIncomeGroup(Number(tab.dataset.europaFixedIncomeClass));
    });
  });

  renderEuropaFixedIncomeGroup(0);
}
