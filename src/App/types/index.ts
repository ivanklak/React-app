import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

import {AppStateType} from '../redux-store';

type FunctionType = (...args: any[]) => void;
type ActionCreatorsMapObject = {[actionCreator: string]: FunctionType};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type IThunkResult<R, A extends Action> = ThunkAction<R, AppStateType, unknown, A>;
