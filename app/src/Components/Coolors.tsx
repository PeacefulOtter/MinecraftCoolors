
import { useEffect, useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from 'react-beautiful-dnd'

import Coolor from './Coolor';

import '../css/coolors.css';
import { get, post } from '../assets/requests';

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export interface Color {
    texture: string;
    palette: {[key: string]: any};
    locked: boolean;
}

const defaultColorsNb = 5;

const Coolors = () => {
    const [coolors, setCoolors] = useState<Color[]>([])
    const [dragDisabled, setDisableDrag] = useState<boolean>(true)

    const randomCoolors = () => {
        const colorsNb = coolors.length > 0 
            ? coolors.length : defaultColorsNb;

        post('/textures', {nb: colorsNb}, (data: any) => {
            if ( coolors.length === 0 )
                setCoolors(data)
            else
            {
                setCoolors( coolors.map( 
                    (c,i) => coolors[i].locked 
                    ? c : data[i] ) )
            }
        })
    }

    const keyDownHandler = useCallback( (event: KeyboardEvent) => {
        console.log(coolors.length);
        if (event.code === "Space")
            randomCoolors()
    }, [coolors] )

    useEffect( () => {
        window.addEventListener('keydown', keyDownHandler);
        return () => window.removeEventListener('keydown', keyDownHandler)
    }, [keyDownHandler])

    useEffect( () => {
        randomCoolors()
    }, [])

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        const { source, destination } = result;

        if (!destination || 
            (source.droppableId === destination.droppableId 
            && source.index === destination.index) )
            return;
    
        const newCoolors = reorder(
            coolors,
            source.index,
            destination.index
        )

        setCoolors(newCoolors)
        setDisableDrag(true)
    }

    const toggleLock = (i: number) => {
        const temp = [...coolors]
        temp[i].locked = !temp[i].locked
        setCoolors(temp)
    }

    const enableDrag = () => {
        setDisableDrag(false)
    }

    const addColor = (i: number) => () => {
        get('/texture', (data: any) => {
            console.log(data);
            const temp = [...coolors]
            temp.splice(i, 0, data);
            setCoolors(temp);
        })
    }

    const deleteColor = (i: number) => () => {
        const temp = [...coolors]
        temp.splice(i, 1);
        setCoolors(temp);
    }


    return (
        <div className="coolors-wrapper">
            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable 
                droppableId="droppable" 
                direction="horizontal"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{width: '100%',
                                display: 'grid',
                                gridAutoColumns: '1fr',
                                gridAutoFlow: 'column'}}
                        {...provided.droppableProps}
                    >
                        { coolors.map( (coolor, i) => 
                            <Draggable 
                                key={coolor.texture + i} 
                                draggableId={coolor.texture + i} 
                                isDragDisabled={dragDisabled}
                                index={i}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Coolor 
                                            addColor={addColor(i)}
                                            deleteColor={deleteColor(i)}
                                            texture={coolor.texture}
                                            palette={coolor.palette}
                                            locked={coolor.locked}
                                            onLock={() => toggleLock(i)} 
                                            onDrag={enableDrag}  />
                                        
                                    </div>
                                    
                                )}
                            </Draggable> ) 
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Coolors;
