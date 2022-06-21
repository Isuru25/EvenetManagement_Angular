import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isUndefined } from 'util';
import { IItem, ItemServiceService } from '../service/item-service.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public itm: IItem;
  public itnUrl:string;
  public imgPath:any;

  // tslint:disable-next-line:max-line-length
  constructor( private itmService: ItemServiceService, private diaRef: MatDialogRef<AddItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {

    this.itm = {
      code: null,
      itemCat: null,
      itemCode: null,
      des: null,
      path:null,
      price:null
    };

    this.diaRef.disableClose = true;
    console.log(this.data);
    if ( this.data.update ){
      console.log( 't' );
      this.itmService.getItem(this.data.code).subscribe((r: IItem) => {
          console.log(r);
          this.itm = r[0];
      });
    }
  }



  onSubmit(){

    if(this.itm.itemCat != null && this.itm.des != null && this.itm.price != null){
      console.log(this.data.update);
      if ( this.data.update ){
  
        console.log({
          code: this.data.code,
          itemCat: this.itm.itemCat,
          itemCode: this.itm.itemCode,
          des: this.itm.des
        });
  
        this.itmService.updateItem({
          code: this.data.code,
          itemCat: this.itm.itemCat,
          itemCode: this.itm.itemCode,
          des: this.itm.des,
          path:this.imgPath,
          price:this.itm.price
        }).subscribe(() => {
            this.diaRef.close();
        }, er => {
          console.log(er);
        });
  
      }else{
  
        console.log('t');
        console.log({
          code: 'ITM_T_' + Date.now().toString(),
          itemCat: this.itm.itemCat,
          itemCode: this.itm.itemCode,
          des: this.itm.des,
          path:this.imgPath,
          price:this.itm.price
        });
  
        this.itmService.createItem({
            code: 'ITM_T_' + Date.now().toString(),
            itemCat: this.itm.itemCat,
            itemCode: this.itm.itemCode,
            des: this.itm.des,
            path:this.imgPath,
            price:this.itm.price
        }).subscribe(() => {
              this.diaRef.close();
        }, er => {
          console.log(er);
        });
      }

    }else{
      window.alert("Please insert data correctly");
    }

    

  }

  onFileChange(t){
    
    console.log(t.target.files[0].name);

    var reader = new FileReader();
    reader.readAsDataURL(t.target.files[0]);
    reader.onload = (e:any)=>{
      // console.log(e.target.result);
      this.itnUrl = e.target.result;
    }

    this.imgPath = t.target.files[0].name;

  }

  onCancel(){
    this.diaRef.close();
  }

}
