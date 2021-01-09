import { LIST_PROJECTS, CREATE_PROJECT } from '../actions/projectActions'

const initialState = {
  // projects: [
  //   { id: '1', title: 'Some pink color', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi dignissimos suscipit, est iure praesentium corrupti nesciunt dolore facilis voluptates, veritatis distinctio quo inventore labore non repellat, necessitatibus voluptas nam?' },
  //   { id: '2', title: "In the purple one", content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi dignissimos suscipit, est iure praesentium corrupti nesciunt dolore facilis voluptates, veritatis distinctio quo inventore labore non repellat, necessitatibus voluptas nam?' },
  //   { id: '3', title: 'Mix together colors', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi dignissimos suscipit, est iure praesentium corrupti nesciunt dolore facilis voluptates, veritatis distinctio quo inventore labore non repellat, necessitatibus voluptas nam?' }
  // ]

}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      // console.log('created project', action.payload)
      return {...state}
      // return [action.payload]


    case 'CREATE_PROJECT_ERROR':
      console.log('project creation error', action.err)
      return state

    case LIST_PROJECTS:
      // console.log('project lists', action.payload)
      // return state
      return [...action.payload]

    case 'PROJECT_LIST_ERROR':
      console.log('project listing error', action.err)
      return state

    default:
      return state
  }

}

export default projectReducer


