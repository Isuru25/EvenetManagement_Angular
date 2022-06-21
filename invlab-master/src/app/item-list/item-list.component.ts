import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { IItem, ItemServiceService } from '../service/item-service.service';

@Component({

  // tslint:disable-next-line:component-selector
  selector: ' item-list ',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

 
  public itemList: IItem;
  constructor(public itemService: ItemServiceService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {

      await this.itemService.getItems().subscribe((rt: IItem) => {
        this.itemList = rt;
        console.log(rt);
      }, er => { console.log(er); });

  }

  onDelete(code){
    this.itemService.deleteItem(code).subscribe(r => { this.ngOnInit(); }, er => { console.log(er); });
  }

  onAddItem(){
    this.dialog.open(AddItemComponent, { data: {update: false, code: null} }).afterClosed().subscribe(() => { this.ngOnInit(); });
  }

  onUpdate(id){
    this.dialog.open(AddItemComponent, { data: {update: true, code: id} }).afterClosed().subscribe(() => { this.ngOnInit(); });
  }


}

