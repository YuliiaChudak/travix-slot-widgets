import reducer, { initialState } from '../slotWidgetsReducer';
import { loadAllSlotWidgets } from '../slot-widgets-thunks';

describe('Slot widgets reducer', () => {
  it(`handles ${loadAllSlotWidgets.pending} action`, () => {
    const action = { type: loadAllSlotWidgets.pending };
    const state = reducer(initialState, action);

    expect(state.isFetching).toBeTruthy();
  });

  it(`handles ${loadAllSlotWidgets.pending} action if error exists`, () => {
    const action = { type: loadAllSlotWidgets.pending };
    const state = reducer({ ...initialState, error: 'Some error' }, action);

    expect(state.error).toBeNull();
    expect(state.isFetching).toBeTruthy();
  });

  it(`handles ${loadAllSlotWidgets.fulfilled} action`, () => {
    const action = {
      type: loadAllSlotWidgets.fulfilled,
      payload: [
        {
          bigTitle: 'Title',
          smallTitle: 'Small title',
          image: 'https://url.com',
          fareId: '1',
        },
      ],
    };
    const state = reducer({ ...initialState, isFetching: true }, action);

    expect(state.isFetching).toBeFalsy();
    expect(state.slots).toEqual(action.payload);
  });

  it(`handles ${loadAllSlotWidgets.rejected} action`, () => {
    const action = {
      type: loadAllSlotWidgets.rejected,
      error: { message: 'Not found' },
    };
    const state = reducer({ ...initialState, isFetching: true }, action);

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toEqual(action.error.message);
  });

  it(`handles ${loadAllSlotWidgets.rejected} action with custom error`, () => {
    const action = {
      type: loadAllSlotWidgets.rejected,
    };
    const state = reducer({ ...initialState, isFetching: true }, action);

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toMatchInlineSnapshot(`"Failed to load slot widgets"`);
  });
});
