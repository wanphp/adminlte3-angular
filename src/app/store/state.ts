import {AuthState} from "@/store/auth/state";
import {UiState} from "@/store/ui/state";

export interface AppState {
  auth: AuthState;
  ui: UiState;
}
