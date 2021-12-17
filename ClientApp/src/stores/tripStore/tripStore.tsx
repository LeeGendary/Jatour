import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Trip } from "../../Models/trip";
import { v4 as uuidv4 } from "uuid";

export default class TripStore {
  trips: Trip[] = [];
  tripRegistry = new Map<string, Trip>();
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

  private setTrip = (trip: Trip) => {
    this.tripRegistry.set(trip.id, trip);
  };

  // Action Loading trips
  loadTrips = async () => {
    this.setLoadingInitial(true);
    try {
      const tripsload = await agent.Trips.list();
      tripsload.forEach((trip) => {
        this.setTrip(trip);
      });

      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadTrip = async (id: string) => {
    let trip = this.tripRegistry.get(id);
    if (trip) {
      this.selectedTrip = trip;
    } else {
      this.setLoadingInitial(true);
      try {
        trip = await agent.Trips.details(id);
        this.setTrip(trip);
        this.selectedTrip = trip;
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };
  // Action for Loading page
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
  selectTrip = (id: string) => {
    // this.selectedTrip = this.trips.find((x) => x.id === id);
    this.selectedTrip = this.tripRegistry.get(id);
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

  /*
    TRIP CRUD OPERATION 
  */
  // Create Trip
  createTrip = async (trip: Trip) => {
    this.loading = true;
    trip.id = uuidv4();
    try {
      await agent.Trips.create(trip as Trip);

      runInAction(() => {
        // this.trips.push(trip);
        this.tripRegistry.set(trip.id, trip);
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

  // Update Trip
  updateTrip = async (trip: Trip) => {
    this.loading = true;
    try {
      await agent.Trips.update(trip as Trip);
      runInAction(() => {
        // this.trips = [...this.trips.filter((a) => a.id !== trip.id), trip];
        this.tripRegistry.set(trip.id, trip);
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

  // Delete Trip
  deleteTrip = async (id: string) => {
    this.loading = true;
    try {
      await agent.Trips.delete(id);
      runInAction(() => {
        // this.trips = [...this.trips.filter((a) => a.id !== id)];
        this.tripRegistry.delete(id);
        if (this.selectedTrip?.id === id) this.cancelSelectTrip();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  //GET By Date Order
  // Issues: StartDate return string
  get tripsByDate() {
    return Array.from(this.tripRegistry.values());
    //  .sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))
  }
}
