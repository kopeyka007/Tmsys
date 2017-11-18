<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-success">
		      	<div class="panel-heading">Panel with panel-info class</div>
		      	<div class="panel-body text-right">
		      		<button type="button" class="btn btn-info" data-toggle="modal" data-target="#addBoards">+Add board</button>
		      		<button type="button" class="btn btn-danger"
					ng-click="signout()">Out</button>
		      	</div>
		    </div>
		    <div class="panel panel-success">
		      	<div class="panel-heading">Panel with panel-info class</div>
		      	<div class="panel-body text-right">
		      		<div>
		      			<div class="boards-repeat"
							data-ng-repeat="(i, boards) in cardsList[key].boards track by $index">
								<p data-ng-bind-html="boards.name + ' ' + '<span>' + boards.width + ' ' + 'x' + ' ' + boards.height + ' ' + 'x' + ' ' + boards.thickness + '</span>' + ' ' + boards.unit + ' ' + boards.brand"></p>
								<span class="price">
									@{{ (boards.price + '').split('.')[0] }}
									<sup> @{{ (boards.price + '').split('.')[1] }}</sup>
								</span>
							</div>
		      			<div class="col-md-12">
		      				<div class="row" data-ng-repeat="(key, cardList) in cardsList track by $index">
		      					<div class="col-md-2">
		      						<img src="@{{ cardList.board_img }}" alt="deska tarasowa">
		      					</div>
		      					<div data-ng-repeat="(i, boards) in cardsList[key].boards track by $index">
		      						<div class="col-md-3">
		      							@{{ boards[0].name }}
		      						</div>
			      					<div class="col-md-1"></div>
			      					<div class="col-md-1"></div>
			      					<div class="col-md-1"></div>
			      					<div class="col-md-2"></div>
			      					<div class="col-md-1"></div>
		      					</div>
		      				</div>
						</div>
		      		</div>
		      	</div>
		    </div>
		</div>
	</div>
</div>

<!-- MODAL ADD BOARDS -->
<div id="addBoards" class="modal fade" role="dialog">
  	<div class="modal-dialog">
	    <div class="modal-content">
	      	<div class="modal-header">
	        	<button type="button" class="close" data-dismiss="modal"
	        	data-ng-click="resetForm()">&times;</button>
	        	<h4 class="modal-title">Modal Header</h4>
	      	</div>
	      	<div class="modal-body">
	        	<form name="addBoard" novalidate="novalidate">
	        		<div class="row">
	        			<div class="col-md-6">
	        				<div class="form-group" 
	        				data-ng-class="{'has-error' : addBoard.terrace_img.$touched && addBoard.terrace_img.$invalid || addBoard.$submitted && addBoard.terrace_img.$invalid, 'has-success' : addBoard.terrace_img.$touched && addBoard.terrace_img.$valid}">
	        					<span class="form-control_label">Zdjęcie tarasów</span>
						        <label for="imgTerrace" class="form-control">
						        	<input type="file" class="form-control file-none" id="imgTerrace" name="terrace_img" 
						        	data-ng-model="terrace_img">
						        </label>
						    </div>
	        			</div>
	        			<div class="col-md-6">
	        				<div class="form-group"
	        				data-ng-class="{'has-error' : addBoard.board_img.$touched && addBoard.board_img.$invalid || addBoard.$submitted && addBoard.board_img.$invalid, 'has-success' : addBoard.board_img.$touched && addBoard.board_img.$valid}">
	        				<span class="form-control_label">Zdjęcie deski</span>
						        <label for="imgBoard" class="form-control">
						        	<input type="file" class="form-control file-none" id="imgBoard" name="board_img" 
						        	data-ng-model="board_img">
						        </label>
						    </div>
	        			</div>
	        		</div>
	        		<div class="row">
	        			<div class="col-md-6">
	        				<div class="form-group"
	        				data-ng-class="{'has-error' : addBoard.name.$touched && addBoard.name.$invalid || addBoard.$submitted && addBoard.name.$invalid, 'has-success' : addBoard.name.$touched && addBoard.name.$valid}">
						        <label for="nameBoard">Nazwa</label>
						        <input type="text" class="form-control" id="nameBoard" placeholder="DESKA TARASOWA BLOOMA" required name="name"
						        data-ng-model="name">
						    </div>
	        			</div>
	        			<div class="col-md-6">
	        				<div class="form-group"
	        				data-ng-class="{'has-error' : addBoard.brand.$touched && addBoard.brand.$invalid || addBoard.$submitted && addBoard.brand.$invalid, 'has-success' : addBoard.brand.$touched && addBoard.brand.$valid}">
						        <label for="brandBoard">Producent</label>
						        <input type="text" class="form-control" id="brandBoard" placeholder="SZARA" required name="brand"
						        data-ng-model="brand">
						    </div>
	        			</div>
	        		</div>
	        		<div class="row">
	        			<div class="col-md-6">
	        				<div class="form-group"
	        				data-ng-class="{'has-error' : addBoard.height.$touched && addBoard.height.$invalid || addBoard.$submitted && addBoard.height.$invalid, 'has-success' : addBoard.height.$touched && addBoard.height.$valid}">
						        <label for="heightBoard">Długość, mm</label>
						        <input type="number" class="form-control" id="heightBoard" placeholder="2400" required name="height"
						        data-ng-model="height">
						    </div>
	        			</div>
	        			<div class="col-md-6">
	        				<div class="form-group"
	        				data-ng-class="{'has-error' : addBoard.width.$touched && addBoard.width.$invalid || addBoard.$submitted && addBoard.width.$invalid, 'has-success' : addBoard.width.$touched && addBoard.width.$valid}">
						        <label for="widthBoard">Szerokość, mm</label>
						        <input type="number" class="form-control" id="widthBoard" placeholder="110" required name="width"
						        data-ng-model="width">
						    </div>
	        			</div>
	        		</div>
	        		<div class="row">
	        			<div class="col-md-6">
	        				<div class="form-group"
	        				data-ng-class="{'has-error' : addBoard.thickness.$touched && addBoard.thickness.$invalid || addBoard.$submitted && addBoard.thickness.$invalid, 'has-success' : addBoard.thickness.$touched && addBoard.thickness.$valid}">
						        <label for="thicknessBoard">Wysokość, mm</label>
						        <input type="number" class="form-control" id="thicknessBoard" placeholder="25" required name="thickness"
						        data-ng-model="thickness">
						    </div>
	        			</div>
	        			<div class="col-md-6">
	        				<div class="form-group"
	        				data-ng-class="{'has-error' : addBoard.type.$touched && addBoard.type.$invalid || addBoard.$submitted && addBoard.type.$invalid, 'has-success' : addBoard.type.$touched && addBoard.type.$valid}">
						        <label for="typeBoard">Typ</label>
						        <select class="form-control" id="typeBoard" required name="type" 
						        data-ng-model="type">
								  	<option value="kompozyt" selected="selected">KOMPOZYTOWA</option>
								  	<option value="drevniana">DREWNIANA</option>
								</select>
						    </div>
	        			</div>
	        		</div>
	        		<div class="row">
	        			<div class="col-md-6">
	        				<div class="form-group"
	        				data-ng-class="{'has-error' : addBoard.price.$touched && addBoard.price.$invalid || addBoard.$submitted && addBoard.price.$invalid, 'has-success' : addBoard.price.$touched && addBoard.price.$valid}">
						        <label for="priceBoard">Cena, PLN</label>
						        <input type="number" class="form-control" id="priceBoard" placeholder="85" type="number" min="1" step="1" required name="price"
						        data-ng-model="price">
						    </div>
	        			</div>
	        		</div>
	        		<div class="row">
	        			<div class="col-md-6">
	        				<div class="form-group">
						        <button type="submit" class="btn btn-info"
						        data-ng-click="add()">Add</button>
						    </div>
	        			</div>
	        		</div>
	        	</form>
	      	</div>
	    </div>
  	</div>
</div>
<!-- END MODAL ADD BOARDS -->