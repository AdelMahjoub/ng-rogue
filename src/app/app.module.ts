import { HelperService } from './services/helper.service';
import { StageFogComponent } from './stage/stage-fog/stage-fog.component';
import { GameService } from './services/game.service';
import { EntityService } from './services/entity.service';
import { CameraService } from './services/camera.service';
import { DungeonService } from './services/dungeon.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StageComponent } from './stage/stage.component';
import { StageTileComponent } from './stage/stage-tile/stage-tile.component';
import { StageEntityTileComponent } from './stage/stage-entity-tile/stage-entity-tile.component';
import { StatusBarComponent } from './stage/status-bar/status-bar.component';
import { InventoryComponent } from './stage/inventory/inventory.component';
import { HeaderComponent } from './header/header.component';
import { AudioService } from "app/services/audio.service";
import { HelpMapComponent } from './stage/help-map/help-map.component';

@NgModule({
  declarations: [
    AppComponent,
    StageComponent,
    StageTileComponent,
    StageEntityTileComponent,
    StatusBarComponent,
    InventoryComponent,
    HeaderComponent,
    StageFogComponent,
    HelpMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    DungeonService,
    CameraService,
    EntityService,
    GameService,
    AudioService,
    HelperService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
