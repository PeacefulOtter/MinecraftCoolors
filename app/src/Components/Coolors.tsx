
import { FC, useEffect, useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from 'react-beautiful-dnd'

import Coolor from './Coolor';

import '../css/coolors.css';
import { get } from '../assets/requests';
import { Color } from '../assets/models';


const MAX_NB_COLORS = 8;
const MIN_NB_COLORS = 3;

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};


type Props = {
    coolors: Color[]
    setCoolors: (coolors: Color[]) => void
    setRandomCoolors: () => void;
}


const Coolors: FC<Props> = ( { coolors, setCoolors, setRandomCoolors } ) => {
    const [dragDisabled, setDisableDrag] = useState<boolean>(true)

    const keyDownHandler = useCallback( (event: KeyboardEvent) => {
        console.log(coolors.length);
        if (event.code === "Space")
            setRandomCoolors()
    }, [coolors] )

    useEffect( () => {
        window.addEventListener('keydown', keyDownHandler);
        return () => window.removeEventListener('keydown', keyDownHandler)
    }, [keyDownHandler])

    useEffect( () => {
        setRandomCoolors()
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

        if ( coolors.length >= MAX_NB_COLORS )
            return;

        get('/texture', (data: any) => {
            console.log(data);
            const temp = [...coolors]
            temp.splice(i, 0, data);
            setCoolors(temp);
        })
    }

    const deleteColor = (i: number) => () => {

        if ( coolors.length <= MIN_NB_COLORS )
            return; 
            
        const temp = [...coolors]
        temp.splice(i, 1);
        setCoolors(temp);
    }

    const getItemStyle = (isDragging: boolean, props: any) => {

        const { style } = props;
        const { transform, ...draggableStyle } = style;
        
        if ( !transform ) 
            return props

        const x = transform.split('px')[0].replace('translate(', '')
        props['style']['transform'] = `translate(${x}px, 0px)`

        return props;
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
                                {(provided, snapshot) => {

                                    const style = getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps
                                    )

                                    return (
                                    <div
                                        ref={provided.innerRef}
                                        {...style}
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
                                    
                                )}}
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
