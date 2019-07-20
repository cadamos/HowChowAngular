import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/service/upload-file.service';
import { DishService } from 'src/app/service/dish.service';
import { Tag } from 'src/app/model/tag';
import { EventBrokerService, EventListener } from 'src/app/service/ebroker.service';
import { TagService } from 'src/app/service/tag.service';



@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {

  selectedFiles: FileList;
  //from navbar
  options : Tag[];
  selectedOptions : Tag[];
  _myEventListener : EventListener;
  //
  imgUrl:string;
  dishName: string;
  dishRest: string;
  dishDesc: string;
  dishTags: Tag[];

  constructor(private uploadService: UploadFileService, private dishService:DishService, private tagService : TagService,
    private _ebrokerService : EventBrokerService) 
    { 
      this._myEventListener = this._ebrokerService.listen<Tag[]>('selectedOptions',(selectedOptions : Tag[]) => {
        this.selectedOptions = selectedOptions;
        this.ngOnInit();
      });
      
    }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(tags => {
      this.options = tags;
    })
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file);
    this.imgUrl='https://howchow-angular-bucket.s3.us-east-2.amazonaws.com/'+this.uploadService.getDataLocation();
    console.log(this.imgUrl);
    this.dishService.addDish(this.dishName, this.dishRest, this.dishDesc, this.imgUrl, this.selectedOptions).subscribe();


  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  ngOnDestroy(): void {
    this._myEventListener.ignore();
  }
}
