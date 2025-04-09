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
    price: number
    sponsoredBy?: string | undefined
}

export type EventResponseDTO = CreateEventDTO & {
    _id: string
}