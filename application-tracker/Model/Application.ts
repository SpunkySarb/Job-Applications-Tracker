import ApplicationList from "./ApplicationList";

class Application {
  link: string; //link=PK
  title: string;
  category: string; //-company
  notes: string;
  status: "not-applied" | "applied" | "rejected" | "interview";

  constructor(
    link: string,
    title: string,
    category: string,
    notes?: string,
    status?: "not-applied" | "applied" | "rejected" | "interview"
  ) {
    this.link = link;
    this.title = title;
    this.status = status ? status : "not-applied";
    this.category = category;
    this.notes = notes ? notes : "";
  }

  /**
   * 
   * @param list : The original object of ApplicaitonList is passed to save the changes after they are made.
   */
  applied(list: ApplicationList) {
    if (this.status === "not-applied") {
      this.status = "applied";

      list.lengths["not-applied"]--;
      if ("applied" in list.lengths) {
        list.lengths["applied"]++;
      } else {
        list.lengths["applied"] = 1;
      }
      list.saveData();
    }
  }
/**
   * 
   * @param list : The original object of ApplicaitonList is passed to save the changes after they are made.
   */
  gotRejected(list: ApplicationList) {
    if (this.status === "applied") {
      this.status = "rejected";

      list.lengths["applied"]--;
      if ("rejected" in list.lengths) {
        list.lengths["rejected"]++;
      } else {
        list.lengths["rejected"] = 1;
      }
      list.saveData();
    }
  }
/**
   * 
   * @param list : The original object of ApplicaitonList is passed to save the changes after they are made.
   */
  gotInterview(list: ApplicationList) {
    if (this.status === "applied") {
      this.status = "interview";

      list.lengths["applied"]--;
      if ("interview" in list.lengths) {
        list.lengths["interview"]++;
      } else {
        list.lengths["interview"] = 1;
      }
      list.saveData();
    }
  }
/**
   * 
   * @param list : The original object of ApplicaitonList is passed to save the changes after they are made.
   */
  edit(
    link: string,
    title: string,
    category: string,
    list: ApplicationList
  ) {
    this.link = link;
    this.title = title;
    this.category = category;
    list.saveData();
  }
/**
   * 
   * @param list : The original object of ApplicaitonList is passed to save the changes after they are made.
   */
  updateNotes(notes: string, list: ApplicationList) {
    this.notes = notes;
    list.saveData();
  }
}

export default Application;
