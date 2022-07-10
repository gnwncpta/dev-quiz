import './tailwind.css';
import { useState, useEffect } from 'react';

function Options(props){
    const { options, setAnswer } = props;
    const keys = [ "a", "b", "c", "d" ];
    return options.map((option, i) => <button key={i+1} className="py-[10px] px-[10px] text-[14px] transition rounded-lg bg-white/10 hover:bg-white/10 focus:bg-blue-500" onClick={() => setAnswer(keys[i])}>{option}</button>)
}

export default function App(props){

    const [ order, setOrder ] = useState(1);
    const [ questions, setQuestions ] = useState([]);
    const [ answer, setAnswer ] = useState('');
    const [ points, setPoints ] = useState(0);

    useEffect(() => {
        (async function getQuestions(){
            const qs = await fetch(`${process.env.API_URL}/questions`);
            const data = await qs.json();
            setQuestions(data.result.questions);
        })();
    }, []);
    

    function CheckAnswer(e){
        if(answer === questions[order-1].answer){
            setPoints(points + 20);
            setAnswer('');
            if(order < questions.length){
                setOrder(order + 1);
            } else {
                setOrder(1);
            }
        } else {
            alert("WRONG!!");
        }
    }
    
    function CancelAnswer(e){
        const tag = e.target.tagName;

        if(tag !== 'BUTTON'){
            setAnswer('');
        } 
    }

    function Reset(){
        setAnswer('');
        setOrder(1);
        setPoints(0);
    }

    return (
        <section className="w-full h-screen flex flex-col items-center justify-center bg-slate-800" onClick={CancelAnswer}>
            <section className="w-[414px] mobileL:w-screen">
                <section className="w-[414px] px-[30px] flex items-start justify-between absolute top-10 mobileL:w-screen">
                    <p>
                        <h1 className="text-white text-[24px] font-bold">Dev Quiz</h1>
                        <p className="mt-[5px] text-[12px] text-white/20 font-light leading-none">Made by<br/> Gunawan Cipta</p>
                    </p>
                    <div>
                        <p className="w-full py-[6px] px-[10px] text-white font-medium text-[14px] bg-white/10 rounded-md animate-fadeIn">{points} {points > 0 ? "Points" : "Point"}</p>
                        <button className="w-full mt-[5px] p-[6px] px-[12px] text-[14px] text-white/30 bg-white/5 rounded-md" onClick={Reset}>Reset</button>
                    </div>
                </section>

                <section className="p-[30px] text-white animate-fadeIn">
                    <div className="mb-[40px]">
                        { questions.length < 1 && <h1 className="text-white font-bold text-[20px]">Loading ...</h1> }
                        { questions.length !== 0 && <h1 className="text-white font-bold text-[24px] mobileL:text-[28px] mobileL:leading-tight text-center">"{questions[order-1].question}"</h1> }
                    </div>
                    
                    <section className="mt-[20px] grid grid-cols-2 gap-3">
                        { questions.length && <Options options={questions[order-1].options} setAnswer={setAnswer} /> }
                    </section>
                </section>

                { answer.length > 0 && 
                    <section className="w-[414px] mobileL:w-screen fixed bottom-0 mobileL:bg-slate-700/10">
                        <section className="w-full p-[30px] py-[20px]">
                            <button className="w-full py-[12px] rounded-lg bg-blue-500 text-white font-bold animate-fadeIn" onClick={CheckAnswer}>Check Answer</button>
                        </section>
                    </section>
                }
            </section>
        </section>
    )

}