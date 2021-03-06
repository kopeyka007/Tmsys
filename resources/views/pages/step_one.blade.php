<!-- P A G E   O N E -->

<div class="wrapper">
	<div class="page-one">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<div class="step-one-box">
						<div class="box-logo">
							<div class="logo-light text-center">
								<img src="/storage/images/logo-white.png" alt="TMsys">
							</div>
							<p class="text-center">
								Program RazTaraz pozwala na szybki dobór technologii wykonania tarasu <br>
								a także kalkulacje kosztów materiałowych
							</p>
						</div>
						<div class="steps-box">
							<ul class="clearfix">
								<li class="active"><span>1</span></li>
								<li><span>2</span></li>
								<li><span>3</span></li>
								<li><span>4</span></li>
							</ul>
							<span class="caption-step-box">wybierz materiał deski</span>
						</div>
						<div class="choice clearfix">
							<div class="row">
								<div class="col-xs-6">
									<div class="choice-item">
										<h2 class="h2 text-center">Deska kompozytowa</h2>
										<div class="choice-item-img">
											<img src="/storage/images/komposit.jpg" alt="Deska kompozytowa">
										</div>
										<ul class="choice-list">
											<li><span>Brak konieczności wykonywania prac konserwacyjnych</span></li>
											<li><span>Duża odporność na wilgoć i działanie wody</span></li>
											<li><span>Bezpieczna powierzchnia antypoślizgowa</span></li>
											<li><span>Estetyczny wygląd tarasu</span></li>
											<li><span>Łatwy montaż</span></li>
											<li><span>Wysoka trwałość</span></li>
										</ul>
										<button type="button" class="btn-main text-center" 
										ng-click="typeDeska('composite'); changeRoute('/step_two', 'slide-left'); scroll(); lastend(0);">Wybierz</button>
									</div>
								</div>
								<div class="col-xs-6">
									<div class="choice-item">
										<h2 class="h2 text-center">Deska drewniana</h2>
										<div class="choice-item-img">
											<img src="/storage/images/drewnian.jpg" alt="Deska drewniana">
										</div>
										<ul class="choice-list">
											<li><span>Drewnianą posadzkę można ułożyć z dużych <br>elementów</span></li>
											<li><span>Nieco korzystniejsza cena niż taras z kompozytu</span></li>
											<li><span>Drewno jest ciepłe w dotyku, a jednocześnie nie <br>nagrzewa się latem</span></li>
											<li><span>Amortyzuje upadki</span></li>
										</ul>
										<button class="btn-main text-center" 
										ng-click="typeDeska('wooden'); changeRoute('/step_two', 'slide-left'); scroll(); lastend(0)">Wybierz</button>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- E N D  P A G E   O N E -->
