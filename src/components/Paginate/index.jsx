import React from 'react'

const Paginate = ({isFirst, isLast, handler, currentPage}) => {
    return (
        <div className='d-flex' style={{ maxWidth: '300px' }}>
            <button onClick={() => handler(currentPage-1)} disabled={isFirst} className={`${isFirst ? 'bg-secondary text-light' : 'bg-primary text-white'} outline-0 border-0 rounded me-2 px-3 py-1`}>Prev</button>
            <button onClick={() => handler(currentPage+1)} disabled={isLast} className={`${isLast ? 'bg-secondary text-light' : 'bg-primary text-white'} outline-0 border-0 rounded me-2 px-3 py-1`}>Next</button>
        </div>
    )
}

export default Paginate