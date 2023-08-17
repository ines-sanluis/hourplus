const timesheet = [
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
    {
        "id": Math.random(),
        "start": "15/08/2023, 10:00",
        "end": "15/08/2023, 15:00",
        "hours": "08:00",
        "shift": "07:30",
        "balance": "00:30"
    },
]

export default (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(timesheet)
}