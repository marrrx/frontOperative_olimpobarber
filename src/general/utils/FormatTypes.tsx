export enum FormatTypes {
    Date,
    DateTime,
    String,
    Int,
    Double,
    Codelist,

}
export const FormatTypesTranslation = (key: string) => {
    switch (key) {
        case FormatTypes.Date.toString():
            return "Fecha";
        case FormatTypes.DateTime.toString():
            return "Fecha y hora";
        case FormatTypes.String.toString():
            return "Texto";
        case FormatTypes.Int.toString():
            return "Numérico";
        case FormatTypes.Double.toString():
            return "Decimal";
        case FormatTypes.Codelist.toString():
            return "Catálogo";
        default:
            break;
    }
}