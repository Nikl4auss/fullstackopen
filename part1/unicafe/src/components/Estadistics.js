const Estadistics = ({good, neutral, bad, all, average, positive}) => {
    
    if(all === 0) {
        return (
        <section>
            <h1>Estadistics</h1>
            <p>no feedback given</p>
        </section>
        )
    }

    return (
        <section>
        <h1>Stadistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </section>
    )
}

export default Estadistics