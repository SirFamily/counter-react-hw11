const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App/>)

// function Counter(props) {
//   const {item : {id, number}, hdlUpdate} = props
function Counter({item : {id, number}, hdlUpdate ,hdlClear, hdlDelCounter} ) {
  const p = new Audio();
  p.src = "./STREAMING-retro-game-coin-pickup-jam-fx-1-00-03.mp3";
  const hit = new Audio();
  hit.src = "./hitHurt.wav";
  const lost = new Audio();
  lost.src = "./STREAMING-video-game-points-lost-retro-glitchedtones-1-00-01.mp3";


  return (
   <div className='counter'>
      <button onClick = {()=>{hdlUpdate(id,-1); p.play();}}> - </button>
      <h3>{number}</h3>
      <button onClick = {()=>{hdlUpdate(id,1); p.play();}}> + </button>
      <button onClick = {()=>{hdlClear(id,-number); hit.play();}}> C </button>
      <button onClick={() => {hdlDelCounter(id); lost.play();}}> X </button>

   </div>
  //  <div className='counter'>
  //     <button onClick = {()=>props.hdlUpdate(props.item.id,-1)}> - </button>
  //     <h3>{props.item.number}</h3>
  //     <button onClick = {()=>props.hdlUpdate(props.item.id,1)}> + </button>
  //     <button onClick = {()=>props.hdlUpdate(props.item.id,-props.item.number)}> C </button>
  //  </div>
  )
}

function SumInfo(props)  {
  const totalSum = props.counters.reduce((sum, counter) => sum + counter.number, 0);
  const stTitle = {
    color : props.color,
    fontSize : props.size==='big' ? '50px' : '30px',
  }
  const img = {
    width: '40px',
  }
  return (
    <div className='suminfo'>
      {/* <h1 style={stTitle}>Sum = 0</h1> */}
      <div style={stTitle}><img src="./33HS.gif" alt="coin" style={img} /> = {totalSum}</div>
    </div>
  )
}

function Time(){
  const [time, setTime] = React.useState(300);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);

  },);
  return(
    <>
    <div>{time}</div>
    </>
  )
}

function App() {

  const [counters, setCounters] = React.useState([ {id: 1, number: 0} ])
  
  // let allCounter = Array(counters).fill(<Counter />)
  
  const hdlUpdate = (id, num) => {
    const  cloneCounters = [...counters]
    let idx = cloneCounters.findIndex( el => el.id === id)
    if( cloneCounters[idx].number + num < 0) {
      return
    }
    cloneCounters[idx].number += num
    setCounters(cloneCounters)
  }
  const hdlClear = (id) => {
    const  cloneCounters = [...counters]
    let idx = cloneCounters.findIndex( el => el.id === id)
    cloneCounters[idx].number = 0
    setCounters(cloneCounters)
  }

  const hdlDelCounter = (id) => {
    const cloneCounters = counters.filter((counter) => counter.id !== id);
    setCounters(cloneCounters);
  };
  

  // ปุ่ม C ต้องใช้ได้
  // ตัวเลขต้องไม่ติดลบ
  const hdlAddCounter = ()=>{
    let newId = counters.length===0 ? 1 : counters.at(-1).id +1 
    // setCounter([...counters, {id: newId, number : 0}])
    const  cloneCounters = [...counters]
    cloneCounters.push( {id: newId, number: 0} )
    setCounters(cloneCounters)
  }
  const jump = new Audio();
  jump.src = "./sfx_jump_07-80241.mp3";

  return (
  <>
    <div className="container">
      <div className="text">Thiraphat <br /><button className='text-center' onClick={() => { hdlAddCounter(); jump.play(); }}>Add Counter</button></div>
      <div className="text"><SumInfo color="black" size="No" counters={counters}/> </div>
      <div className="text">WORLD <br />1-1</div>
      <div>TIME <br /><Time /></div>
    </div>
    
    

    {counters.map( el => {
      return <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlClear={hdlClear} hdlDelCounter={hdlDelCounter}/> 
    } )}

  </>
  )
}