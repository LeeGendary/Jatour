import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Trip } from "../../Models/trip";
import { v4 as uuidv4 } from "uuid";

export default class TripStore {
  trips: Trip[] = [];
  selectedTrip: Trip | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  /**
   * Bind the Observable in the constructor
   */
  constructor() {
    makeAutoObservable(this);
  }
  // Action Loading trips
  loadTrips = async () => {
    this.setLoadingInitial(true);
    try {
      const tripsload = await agent.Trips.list();
      tripsload.forEach((trip) => {
        this.trips.push(trip);
      });

      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  // Action for Loading page
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
  selectTrip = (id: string) => {
    this.selectedTrip = this.trips.find((x) => x.id === id);
  };

  cancelSelectTrip = () => {
    this.selectedTrip = undefined;
  };
  openModalForm = (id?: string) => {
    id ? this.selectTrip(id) : this.cancelSelectTrip();
    this.editMode = true;
  };
  closeModalForm = () => {
    this.editMode = false;
    this.cancelSelectTrip();
  };

  createTrip = async (trip: Trip) => {
    this.loading = true;
    trip.id = uuidv4();
    try {
      await agent.Trips.create(trip as Trip);

      runInAction(() => {
        this.trips.push(trip);
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateTrip = async (trip: Trip) => {
    this.loading = true;
    try {
      await agent.Trips.update(trip as Trip);
      runInAction(() => {
        this.trips = [...this.trips.filter((a) => a.id !== trip.id), trip];
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteTrip = async (id: string) => {
    this.loading = true;
    try {
      await agent.Trips.delete(id);
      runInAction(() => {
        this.trips = [...this.trips.filter((a) => a.id !== id)];
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
