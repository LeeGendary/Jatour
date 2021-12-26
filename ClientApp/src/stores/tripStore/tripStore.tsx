import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Trip, TripFormValues } from "../../Models/trip";

import { store } from "../store";
import { toast } from "react-toastify";
import { Profile } from "../../Models/profiles";
import { history } from "../..";
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
    const user = store.userStore.user;
    if (user) {
      trip.isGoing = trip.attendees!.some((a) => a.username === user.username);
      trip.isHost = trip.author === user.username;
      trip.host = trip.attendees?.find((x) => x.username === trip.author);
    }
    trip.startDate = new Date(trip.startDate!);
    trip.endDate = new Date(trip.endDate!);
    this.tripRegistry.set(trip.id, trip);
  };

  // Action Loading trips
  loadTrips = async () => {
    this.setLoadingInitial(true);
    await agent.Trips.list()
      .then((response) => {
        response.forEach((trip) => {
          this.setTrip(trip);
        });
        this.setLoadingInitial(false);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => this.setLoadingInitial(false));
  };

  loadTrip = async (id: string) => {
    let trip = this.tripRegistry.get(id);
    if (trip) {
      this.selectedTrip = trip;
    } else {
      this.setLoadingInitial(true);
      await agent.Trips.details(id)
        .then((response) => {
          this.setTrip(response);
          this.selectedTrip = response;
          this.setLoadingInitial(false);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => this.setLoadingInitial(false));
    }
  };
  // Action for Loading page
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectTrip = (id: string) => {
    this.selectedTrip = this.trips.find((x) => x.id === id);
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
    store.modalStore.closeModal();
  };

  private getTrip = (id: string) => {
    return this.tripRegistry.get(id);
  };
  /*
    TRIP CRUD OPERATION 
  */
  // Create Trip
  createTrip = async (trip: TripFormValues) => {
    this.loading = true;
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    trip.startDate = new Date(trip.startDate!);
    trip.endDate = new Date(trip.endDate!);
    await agent.Trips.create(trip as Trip)
      .then((res) => {
        const newTrip = new Trip(trip);
        newTrip.author = user!.username;
        newTrip.attendees = [attendee];
        this.setTrip(newTrip);
        runInAction(() => {
          this.selectedTrip = newTrip;
          this.editMode = false;
          this.loading = false;
        });
        toast.success("Trip Added", {
          icon: "🚀",
          position: "bottom-left",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(`Fail to add trip - ${error.response.data.title}`, {
          icon: "😔",
          position: "bottom-left",
          theme: "colored",
        });
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  // Update Trip
  updateTrip = async (trip: TripFormValues) => {
    this.loading = true;
    await agent.Trips.update(trip as Trip)
      .then((res) => {
        runInAction(() => {
          if (trip.id) {
            let updatedTrips = { ...this.getTrip(trip.id), ...trip };
            this.tripRegistry.set(trip.id, updatedTrips as Trip);
            this.selectedTrip = updatedTrips as Trip;
          }
          this.editMode = false;
          this.loading = false;
        });
        toast.success("Trip Updated", {
          icon: "🚀",
          position: "bottom-left",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Fail to Update trip - ${error.response}`, {
          icon: "😔",
          position: "bottom-left",
          theme: "colored",
        });
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  // Delete Trip
  deleteTrip = async (id: string) => {
    this.loading = true;
    await agent.Trips.delete(id)
      .then((res) => {
        runInAction(() => {
          this.trips = [...this.trips.filter((a) => a.id !== id)];
          this.tripRegistry.delete(id);
          if (this.selectedTrip?.id === id) this.cancelSelectTrip();
          this.loading = false;
        });
        toast.success("Trip Deleted", {
          icon: "🚀",
          position: "bottom-left",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Fail to delete trip - ${error.response.data.title}`, {
          icon: "😔",
          position: "bottom-left",
          theme: "colored",
        });
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  //Update Attendance
  updateAttendance = async (id: string) => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Trips.attend(this.selectedTrip!.id);
      runInAction(() => {
        if (this.selectedTrip?.isGoing) {
          this.selectedTrip.attendees = this.selectedTrip.attendees?.filter(
            (a) => a.username !== user?.username
          );
          this.selectedTrip.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedTrip?.attendees?.push(attendee);
          this.selectedTrip!.isGoing = true;
        }
        this.tripRegistry.set(this.selectedTrip!.id, this.selectedTrip!);
      });
    } catch (error) {
      console.error(error);
      // toast.error(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };
  //GET By Date Order
  // Issues: StartDate return string
  // Fix
  get tripsByDate() {
    return Array.from(this.tripRegistry.values()).sort(
      (a, b) => a.startDate!.getTime() - b.startDate!.getTime()
    );
  }
}
