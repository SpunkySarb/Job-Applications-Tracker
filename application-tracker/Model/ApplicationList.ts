import AsyncStorage from "@react-native-async-storage/async-storage";
import Application from "./Application";

class JobNode {
  data: Application;
  next: JobNode | null;

  constructor(data: Application) {
    this.data = data;
    this.next = null;
  }
}

class ApplicationList {
  head: JobNode|null;
  tail: JobNode|null;
  lengths: { [key: string]: number };

  constructor(data: Application) {
    const newNode = new JobNode(data);
    this.head = newNode;
    this.tail = this.head;
    this.lengths = {};
    this.lengths[newNode.data.status] = 1;
    
  }

  insert(data: Application) {
    /**
     * inserting in the front..
     */
    const newNode = new JobNode(data);

    newNode.next = this.head;
    this.head = newNode;
   

    if (newNode.data.status in this.lengths) {
      this.lengths[newNode.data.status]++;
    } else {
      this.lengths[newNode.data.status] = 1;
    }
    this.saveData();
  }
/**
 * 
 * JobLink is unique so serves as PK
 * 
 * NOTE:Even its unlikely but still, A user can add one jobLink twice, we could check before adding a job if it exists or not
 * but that would have been O(n) which I do not want.
 * 
 */
  delete(link: string) {
    try {
      let prevNode = null;
      let currentNode = this.head;
      let nextNode = currentNode ? currentNode.next : null;

      while (currentNode !== null && currentNode.data.link !== link) {
        prevNode = currentNode;
        currentNode = nextNode!;
        nextNode = currentNode ? currentNode.next : null;
      }

      if (currentNode === null || currentNode.data.link !== link) {
        return; // Link not found
      }

      if (prevNode === null) {
        this.head = nextNode!;
      } else {
        prevNode.next = nextNode;
      }

      if (nextNode === null) {
        this.tail = prevNode!;
      }

      this.lengths[currentNode.data.status]--;
    } catch (err: any) {
      console.log(err);
    }
    this.saveData();
  }


  getList() {
    const list: Application[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      list.push(currentNode.data);
      currentNode = currentNode.next!;
    }

    return list;
  }

  getJobTitles(){

    const list: string[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      const title = currentNode.data.title;
      if(title.trim()!=="") list.push(title);
      currentNode = currentNode.next!;
    }

    return list;

  }

  getCompanies(){
    const list: string[] = [];

    let currentNode = this.head;
    while (currentNode !== null) {
      const company = currentNode.data.category;
     if(company.trim()!=="") list.push(company);
      currentNode = currentNode.next!;
    }

    return list;
  }

  /**
   * 
   * Saves the data to Storage.
   */
  async saveData() {
    try {
      await AsyncStorage.setItem("data", JSON.stringify(this));
      return true;
    } catch (e) {
      return false;
    }
  }


  /**
   * 
   * @returns Loads and Deserializes the data back in Memory.
   */
  async loadData() {
    try {
      const loadedData = await AsyncStorage.getItem("data");
  
      if (loadedData) {
        const data: ApplicationList = JSON.parse(loadedData);
        this.head = null;
        this.tail = null;
        this.lengths = data.lengths;
  
        let currentNode = data.head;
        while (currentNode !== null) {
          const appData = currentNode.data;
          const newNode = new JobNode(
            new Application(
              appData.link,
              appData.title,
              appData.category,
              appData.notes,
              appData.status
            )
          );
  
          if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
          } else {
            this.tail!.next = newNode;
            this.tail = newNode;
          }
  
          currentNode = currentNode.next;
        }
      } else {
        console.log("Could not load the data");
      }
    } catch (e) {
      console.log("Error loading data", e);
      return false;
    }
  }

  async eraseData(){

    try{
      await AsyncStorage.removeItem('data');
      
      this.head = this.tail;      
     
      this.lengths = {};
      this.lengths[this.head!.data.status] = 1;
      this.saveData();
      

    }catch(err:any){
console.log(err);
    }

  }

}

export default ApplicationList;

/**I am initializing the list with one rejected and empty applicaiton
 * If you see I decremeted the number of Rejected Applications by 1
 * Its because of this.
 * 
 * ANOTER SOLUTION: We could also skip the increase of the length this.length in the constructor.
 * 
 * */
export const jobList = new ApplicationList(new Application('','','','','rejected'));