import React, { useCallback } from 'react';
import Button from 'components/Button';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';


export default function AddButton() {
    const router = useRouter()
    const onAdd = useCallback(() => {
        router.push("/compose/entry")
    }, [])

    return <Button onClick={onAdd} primary>
        <AddIcon />
        <span>Engadir</span>
    </Button>
}