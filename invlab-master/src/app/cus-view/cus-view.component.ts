import { Component, OnInit } from '@angular/core';
import { IItem, ItemServiceService } from '../service/item-service.service';

@Component({
  selector: 'app-cus-view',
  templateUrl: './cus-view.component.html',
  styleUrls: ['./cus-view.component.css']
})
export class CusViewComponent implements OnInit {

  
  public itemList: IItem;

  constructor(private itemService: ItemServiceService) { }

  async ngOnInit(): Promise<void> {

    await this.itemService.getItems().subscribe((rt: IItem) => {
      this.itemList = rt;
    }, er => { console.log(er); });

  }


  onChange(t){
      console.log(t);
      this.itemService.getItem_byCategory(t).subscribe(res=>{
        this.itemList = res;
      },er=>{
        window.alert(er);
      });
  }
}
