export function TitlePrincipal(props) {
    return (
        <h2 className="text-xl font-bold font-sans text-gray-500">{props.titulo}</h2>
    )
}

export function TitleSecundario(props) {
    return (
        <h2 className="text-base font-bold font-sans text-gray-500">{props.subtitulo}</h2>
    )
}