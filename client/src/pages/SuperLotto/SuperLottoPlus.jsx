export default function SuperLottoPlus() {
    return (
        <div className="super-lotto-plus-container">
            <h2>{gameName}</h2>
            <div className="super=lotto-plus">
                <p className="draw-date-latest"><strong>Date: </strong>{latest?.drawDate}</p>
                <p className="draw-numbers-latest">{latest?.drawNumbers}</p>
            </div>
        </div>
    )
}