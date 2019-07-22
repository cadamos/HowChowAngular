import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/model/tag';
import { TagService } from 'src/app/service/tag.service';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EventBrokerService } from 'src/app/service/ebroker.service';

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.css']
})
export class EditTagsComponent implements OnInit {

  addTagForm : boolean;
  deleteTagForm : boolean;
  addSuccess : boolean;
  deleteSuccess : boolean;
  enterTagAlert : boolean;
  tagExists : boolean;
  tagOptions : Tag[];
  selectedTags : Tag[];
  tagToAdd : string;
  tagEdited : string = "Tags have been edited";

  constructor( 
    private tagService : TagService,
    private router : Router,
    private _ebrokerService : EventBrokerService
  ) { }

  ngOnInit() {
    this.addSuccess = false;
    this.deleteSuccess = false;
    this.addTagForm = false;
    this.deleteTagForm = false;
    this.selectedTags = [];
    this.tagService.getAllTags().subscribe(tags => {
      this.tagOptions = tags;
    });
  }


  addTag() {
    this.tagExists = false;
    this.tagToAdd = undefined;
    this.enterTagAlert = false;
    this.addTagForm = true;
    this.deleteTagForm = false;
  }

  deleteTag() {
    this.tagExists = false;
    this.enterTagAlert = false;
    this.deleteTagForm = true;
    this.addTagForm = false;
  }

  confirmAdd() {
    console.log(this.tagOptions);
    if (this.tagToAdd == undefined) {
      this.enterTagAlert = true;
    } else {
      this.enterTagAlert = false;
      for (let tag of this.tagOptions) {
        if (tag.t_name.toLowerCase()  == this.tagToAdd.toLowerCase()) {
          this.tagExists = true;
          console.log("found the existing tag");
          break;
        }
        this.tagExists = false;
        console.log("this tag doesn't exist");
      }
      if (this.tagExists == false) {
        this.tagService.addTag(this.tagToAdd).subscribe();
        this._ebrokerService.emit<Tag[]>('tagEdited',this.tagOptions);
        this.enterTagAlert = false;
        this.addSuccess = true;
        setTimeout(() => {
          this.ngOnInit();
        }, 2000); 
      }
    }
  }

  confirmDelete() {
    if (this.selectedTags.length < 1) {
      this.enterTagAlert = true;
    } else {
      for (let s_tag of this.selectedTags) {
        this.tagService.deleteTag(s_tag.t_id).subscribe();
      }
      this._ebrokerService.emit<Tag[]>('tagEdited',this.tagOptions);
      this.enterTagAlert = false;
      this.deleteSuccess = true;
      setTimeout(() => {
        this.ngOnInit();
      }, 2000);
    }
  }
}
