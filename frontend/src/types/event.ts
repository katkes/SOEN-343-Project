export type CreateEventDTO = {
    name: string
    description: string
    location: string
    locationType: string
    ticketsSold: number
    maxCapacity: number
    startDateAndTime: Date
    timeDurationInMinutes: number
    speaker: string
}

export type EventResponseDTO = CreateEventDTO & {
    _id: string
}