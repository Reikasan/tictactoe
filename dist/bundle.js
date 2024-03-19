(()=>{"use strict";const e=document.querySelector(".cursor"),n=e.querySelector(".cursor--normal"),t=e.querySelector(".cursor--pointer"),o=document.querySelectorAll(".pointer");let l={x:document.documentElement.clientWidth/2,y:document.documentElement.clientHeight/2};const r=document.querySelector(".screen--start"),u=r.querySelectorAll(".opponent-btn"),s=r.querySelectorAll(".symbol-btn"),i=r.querySelector(".back-btn--opponent"),a=r.querySelector(".select--opponent"),c=r.querySelector(".select--symbol"),d=r.querySelector(".start-game");let m={opponent:"",selectedSymbol:"",opponentSymbol:""},p={turnCount:0,isAutoPlaying:!1,gameBoard:[null,null,null,null,null,null,null,null,null],history:[[null,null,null,null,null,null,null,null,null]],winner:"",winningComb:[]};const y=document.querySelector(".screen--game"),f=y.querySelector(".game-status__text"),v=y.querySelector(".game-status__text--error"),b=y.querySelector(".sign--user"),g=b.querySelector("i"),L=y.querySelector(".sign--opponent"),S=L.querySelector("i"),h=y.querySelector(".switch-opponent-btn"),w=h.querySelector("i"),q=y.querySelectorAll(".board__cell"),E=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],C=document.querySelector(".screen--result"),x=C.querySelector(".result__text"),B=C.querySelector(".result__message"),k=document.querySelectorAll(".back-btn--step"),A=document.querySelector('.back-btn--step[data-player="user"]'),_=document.querySelector('.back-btn--step[data-player="opponent"]'),T=document.querySelectorAll(".reset-btn--all"),M=document.querySelectorAll(".reset-btn--game"),O=document.querySelector(".title"),P="fa-xmark",J="fa-o",N="fa-person",Y="fa-computer";function F(e){l.x=e.clientX,l.y=e.clientY}function $(){const n=Math.round(l.x),t=Math.round(l.y);e.style.transform=`translate(${n}px, ${t}px) scale(1)`,requestAnimationFrame($)}function z(e){n.classList.toggle("hidden"),t.classList.toggle("hidden")}function D(n){e.classList.add(n)}function H(n){e.classList.remove(n)}function I(e){e.classList.add("expand")}function W(e){e.classList.remove("hidden")}function X(e){e.classList.add("hidden")}function j(){return p.turnCount%2==0?"user":"opponent"}function G(){return p.isAutoPlaying}function K(){return p.turnCount>=9||""!==p.winner}function Q(e,n,t){let o,l;if("symbol"===t){if(null===n)return void e.classList.remove(P,J);o="x"===n?P:J,l="x"===n?J:P}else"opponent"===t&&(o="manual"===n?N:Y,l="manual"===n?Y:N);e.classList.remove(l),e.classList.add(o)}function R(){const e=j();!function(e){"user"===e?(b.classList.add("selected"),L.classList.remove("selected")):(b.classList.remove("selected"),L.classList.add("selected"))}(e),function(e){const n="user"===e?"Your turn":"Opponent's turn";f.textContent=n}(e)}function U(){if(0==p.turnCount)return A.classList.add("disabled"),void _.classList.add("disabled");"opponent"===j()?(A.classList.remove("disabled"),_.classList.add("disabled")):"user"===j()&&("auto"===m.opponent?(_.classList.add("disabled"),A.classList.remove("disabled")):(_.classList.remove("disabled"),A.classList.add("disabled")))}function V(e){"user"===e?(B.textContent="congratulations",x.textContent="You win!"):"opponent"===e?(B.textContent="better luck next time",x.textContent="You lose!"):"draw"===e&&(x.textContent="Draw!"),"draw"!==e&&p.winningComb.forEach(((e,n)=>{setTimeout((()=>function(e){q[e].classList.add("board__cell--winning")}(e)),500*n)})),setTimeout((()=>y.classList.remove("show")),2500),setTimeout((()=>W(C)),2500),setTimeout((()=>I(C)),2500),setTimeout((()=>X(y)),2500)}function Z(){for(let e=0;e<q.length;e++){const n=q[e],t=n.querySelector("i");n.classList.remove("board__cell--winning"),Q(t,p.gameBoard[e],"symbol")}}function ee(){p.winner=p.turnCount%2==0?"user":"opponent"}function ne(){let e=JSON.parse(JSON.stringify(p.gameBoard));p.history.push(e)}function te(e){if(G()||K())return;const n=e.querySelector("i"),t="user"===j()?m.selectedSymbol:m.opponentSymbol;!async function(e,n,t){!!le(e,n,t)&&(p.turnCount>=4&&await ce()?(ee(),de(),V(p.winner)):p.turnCount>=8?(p.winner="draw",V(p.winner)):(ae(),ne(),U(),"auto"===m.opponent&&(p.isAutoPlaying=!0,await new Promise((e=>setTimeout(e,1500))),oe())))}(e.dataset.index,t,n)}async function oe(){if(K())return;let e=function(e){if(1===e)return re();{let e=null;if(void Math.floor(2*Math.random())){if(e=ue(),null===e)return null!==se()?se():re()}else if(e=se(),null===e)return null!==ue()?ue():re();return e}}(p.turnCount);const n=q[e].querySelector("i");return le(e,m.opponentSymbol,n),p.turnCount>=4&&await ce()?(ee(),de(),void V(p.winner)):(ae(),ne(),U(),p.isAutoPlaying=!1,!0)}function le(e,n,t){return function(e){return null===p.gameBoard[e]}(e)?(function(e,n){p.gameBoard[e]=n}(e,n),function(e,n){Q(e,n,"symbol"),X(v)}(t,n),!0):(W(v),!1)}function re(){let e=p.gameBoard.map(((e,n)=>null===e?n:-1)).filter((e=>-1!==e));return e[Math.floor(Math.random()*e.length)]}function ue(){return ie(m.selectedSymbol)}function se(){return ie(m.opponentSymbol)}function ie(e){let n=null;const t=E.find((t=>{const[o,l,r]=t;if(p.gameBoard[o]===e){if(p.gameBoard[o]===p.gameBoard[l]&&null===p.gameBoard[r])return n=2;if(p.gameBoard[o]===p.gameBoard[r]&&null===p.gameBoard[l])return n=1}else if(p.gameBoard[l]===e&&p.gameBoard[l]===p.gameBoard[r]&&null===p.gameBoard[o])return n=0;return null}));return void 0===t?null:t[n]}function ae(){p.turnCount+=1,R()}function ce(){return p.winningComb=E.find((e=>{const[n,t,o]=e;if(p.gameBoard[n]&&p.gameBoard[n]===p.gameBoard[t]&&p.gameBoard[n]===p.gameBoard[o])return!0})),void 0!==p.winningComb}function de(){q.forEach((e=>{e.removeEventListener("click",te)}))}function me(e){p.gameBoard=JSON.parse(JSON.stringify(p.history[p.turnCount-e])),p.history=p.history.slice(0,p.history.length-e),p.turnCount-=e}function pe(e,n){"opponent"===e?(m.opponent=n.dataset.opponent,X(a),W(c),Q(w,m.opponent,"opponent")):"symbol"===e&&(m.selectedSymbol=n.dataset.symbol,X(c),W(d),m.opponentSymbol="x"===m.selectedSymbol?"o":"x",Q(g,m.selectedSymbol,"symbol"),Q(S,m.opponentSymbol,"symbol"),R(),setTimeout((()=>function(e){e.classList.add("move-left")}(d)),500),setTimeout((()=>{O.style.zIndex="0"}),500),setTimeout((()=>I(r)),1e3),setTimeout((()=>W(y)),1400),setTimeout((()=>function(e){e.classList.add("move-down"),X(O)}(r)),1800),setTimeout((()=>X(r)),2800))}window.matchMedia("(pointer: fine)")&&document.body.addEventListener("mouseover",(function n(){e.classList.add("isActive"),document.removeEventListener("mouseover",n),document.addEventListener("mousemove",F),requestAnimationFrame($)})),document.body.addEventListener("mouseenter",(()=>{e.classList.add("show")})),document.body.addEventListener("mouseleave",(()=>{e.classList.remove("show")})),o.forEach((e=>{e.addEventListener("mouseover",(()=>{z()})),e.addEventListener("mouseout",(()=>{z()})),e.addEventListener("mousedown",(()=>{D("dark")})),e.addEventListener("mouseup",(()=>{H("dark")}))})),C.addEventListener("mouseover",(()=>{D("pink")})),C.addEventListener("mouseout",(()=>{H("pink")})),u.forEach((e=>{e.addEventListener("click",(()=>pe("opponent",e)))})),s.forEach((e=>{e.addEventListener("click",(()=>pe("symbol",e)))})),i.addEventListener("click",(()=>(X(c),void W(a)))),q.forEach((e=>{e.addEventListener("click",(()=>te(e)))})),k.forEach((e=>{e.addEventListener("click",(()=>{return n=e.dataset.player,void(G()||0===p.steps||"opponent"===n&&"auto"===m.opponent||""!==p.winner||("user"===n&&1===p.turnCount?me(1):"user"===n&&"auto"===m.opponent?me(2):me(1),Z(),U(),R()));var n}))})),h.addEventListener("click",(function(){m.opponent="auto"===m.opponent?"manual":"auto",Q(w,m.opponent,"opponent"),"auto"===m.opponent&&p.turnCount%2!=0&&oe()})),T.forEach((e=>{e.addEventListener("click",(()=>(m.opponent="",m.selectedSymbol="",m.opponentSymbol="",p.turnCount=0,p.gameBoard=[null,null,null,null,null,null,null,null,null],p.history=[[null,null,null,null,null,null,null,null,null]],p.winner="",p.winningComb=[],Z(),U(),R(),W(r),W(O),r.classList.remove("expand"),r.classList.remove("move-down"),a.classList.remove("hidden"),d.classList.add("hidden"),X(y),void X(C))))})),M.forEach((e=>{e.addEventListener("click",(()=>(p.turnCount=0,p.gameBoard=[null,null,null,null,null,null,null,null,null],p.history=[[null,null,null,null,null,null,null,null,null]],p.winner="",p.winningComb=[],Z(),U(),R(),W(y),X(r),X(O),X(C),void C.classList.remove("expand"))))}))})();