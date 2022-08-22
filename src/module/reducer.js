const initialState = {
  EditToggle: false,
  deleteIndex: [],
  cardNum: [],
  addIndex: [],
  DetailToggle: false,
  DetailData: [],
};

const EditToggle = "EditToggle";
const ToggleIndex = "toggleIndex";
const RemoveIndex = "removeIndex";
const Detail = "Detail";

export const EditAction = () => ({
  type: EditToggle,
});

export const addIndexAction = (data) => ({
  type: ToggleIndex,
  data,
});

export const RemoveAction = (data) => ({
  type: RemoveIndex,
  data,
});

export const DetailAction = (data) => ({
  type: Detail,
  data,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EditToggle:
      return {
        ...state,
        EditToggle: !state.EditToggle,
      };

    case ToggleIndex:
      return {
        ...state,
        [action.data.typeName]: [
          ...state[action.data.typeName],
          action.data.target,
        ],
      };

    case RemoveIndex:
      return {
        ...state,
        [action.data.typeName]: [...state[action.data.typeName]].filter(
          (taget) => taget !== action.data.target
        ),
      };

    case Detail:
      if (!state.DetailToggle) {
        return {
          ...state,
          DetailToggle: !state.DetailToggle,
          DetailData: [...action.data],
        };
      } else {
        return {
          ...state,
          DetailToggle: !state.DetailToggle,
          DetailData: [],
        };
      }

    default:
      return state;
  }
}
