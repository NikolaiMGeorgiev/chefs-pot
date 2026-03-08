export default function Steps({ steps }: { steps: string[] }) {    
    return (
        <section className="scrollable">
            <h2>Steps:</h2>
            <ol id="steps-list" className={steps.length > 9 ? "list-indent-2-char" : "list-indent-1-char"}>
                {steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
        </section>
    )
}