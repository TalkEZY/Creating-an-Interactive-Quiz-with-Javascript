$.DoubleJetski = {
    init: function (){
		if ($(".questions .question0").length > 0) {
			$.DoubleJetski.Quiz.init();
		}
	}
};

$(document).ready(function () {
	$.DoubleJetski.init();
});


$.DoubleJetski.Quiz = {
	_score: 0,
	_tempScore: 100,
	_labelScore: [],
	_tempLabelID: 100,
	_currentQuestion: 0,
	_headerOffset: 150,

	init: function () {
		if (sessionStorage.getItem("quiz")) {
			var storage = JSON.parse(sessionStorage.getItem("quiz")),
			test = storage[0],
			question = storage[1],
			answer = storage[2];
			test == quiz._quizID && ($.DoubleJetski.Quiz._currentQuestion = question, $.DoubleJetski.Quiz._labelScore = $.DoubleJetski.Quiz._score = answer);
		} else {
			sessionStorage.setItem("quiz", 0); 
		}

		if ("label" == quiz._quizType) {
			for (var i = resultsData.length, r = 0; i > r; r++){
				$.DoubleJetski.Quiz._labelScore.push(0);
			}
        }
		
		// pass the check box event to parent
		$(".checkbox").click(function() {
        	$(this).siblings('img').click();
    	});

		this._showQuestion(this._currentQuestion);
	},
	
	_retakeQuiz: function () {
		sessionStorage.removeItem("quiz");
	},
	
	_showQuestion: function (questionNumber) {
        if ($.DoubleJetski.Quiz._currentQuestion == quiz._totalQuestions) {                     
            $.DoubleJetski.Quiz._currentQuestion = 0,      
            $.DoubleJetski.Quiz._showResults();
        }
        else
        {
            this.alreadyClicked = !1;
        }
        
        var target = ".question" + questionNumber,
            targetAnswer = target + " .quiz_answer",
            possibleAnswer = $(targetAnswer),
            i = this._getCorrectAnswer(possibleAnswer);
			
        if ($.DoubleJetski.Quiz._currentQuestion == quiz._totalQuestions - 1) { 
            $(target).find(".btn").html("show results");
        } else {
            $(target).find(".btn").html("next question");
        }
        
        for (var r = 0; possibleAnswer.length > r; r++) {
            var cssAnswerObject = targetAnswer + ".answer" + r + " img",
                selectedAnswer = $(cssAnswerObject);
            this._setupAnswerEvents(selectedAnswer, r, possibleAnswer[r], i, possibleAnswer);
        }
        if (questionNumber > 0) {
            var l = ".question" + (1 * questionNumber - 1);
            $(l).fadeOut({
                duration: 800,
                complete: function () {
                    $(target).fadeIn({
                        duration: 800,
                        complete: function () {
                            // nothing here yet!
                        }
                    });
                }
            });
        } else $(target).fadeIn();
    },
    
    _setupAnswerEvents: function (e, test, question, answer, i) {
        var r = this;
        $(e).click(function () {
            if (!r.alreadyClicked) {
                r.alreadyClicked = !0;
                var o = $(".question" + r._currentQuestion),
                    s = $(".question" + r._currentQuestion + " .answer" + answer),
                    l = $(e).parent(),
                    c = $(o).find(".btn");
                if ("test" == quiz._quizType) {
                    if (i[answer] != question) {
                        var u = o.find(".answerStatus");
                        u.html("Sorry, but that was wrong. Try again!"), u.addClass("wrong"), l.find(".checkbox").addClass("wrong"), $(i[a]).find(".checkbox").addClass("corrected"), l.find(".choice").addClass("wrong");
                    } else {
                        var u = o.find(".answerStatus");
                        l.find(".checkbox").addClass("correct"), u.html("correct!"), u.addClass("correct");
                    }
                    for (var d = 0; i.length > d; d++)
                        if (d != answer && d != test) {
                            var p = o.find(" .answer" + d);
                            p.find(".choice").fadeTo("1000", 0.33), 
							p.find(".checkbox").addClass("inactive"),
							p.find("img").fadeTo("1000", 0.33);
                        }
                    s.find(".quizOptions").prepend('<div class="correctAnswer">The correct answer is:</div>'), o.find(".correctAnswer").fadeIn();
                    var f = o.find(".learnmore");
                    f.fadeIn(), f.click(function () {
                        "none" == o.find(".answerText").css("display") ? (o.find(".answerText").slideDown(), f.addClass("learnmoreopen").removeClass("learnmoreclose")) : (o.find(".answerText").slideUp(), f.addClass("learnmoreclose").removeClass("learnmoreopen"), "nvp" == bzDetect.viewport && $("html, body").animate({
                            scrollTop: o.find(".correctAnswer").offset().top
                        }, 800));
                    }), $.DoubleJetski.Quiz._tempScore = l.data("points"), c.removeClass("lightgray"), c.addClass("color-solid-teal-long"), c.click(function () {
                        $.DoubleJetski.Quiz._showNextQuestion();
                    });
                } else if ("points" == quiz._quizType) {
                    l.find(".checkbox").addClass("correct"), l.find(".choice").css("font-weight", "bold");
                    for (var d = 0; i.length > d; d++)
                        if (d != test) {
                            var p = o.find(".answer" + d);
                            p.find(".choice").fadeTo("1000", 0.33),
							p.find(".checkbox").addClass("inactive"),
							p.find("img").fadeTo("1000", 0.33);
                        }
                    $.DoubleJetski.Quiz._tempScore = l.data("points"), setTimeout(function () {
                        $.DoubleJetski.Quiz._showNextQuestion();
                    }, 1e3);
                } else if ("label" == quiz._quizType) {
                    l.find(".checkbox").addClass("correct"), l.find(".choice").css("font-weight", "bold");
                    for (var d = 0; i.length > d; d++);
                        if (d != t) {
                            var p = o.find(" .answer" + d);
                            p.find(".choice").fadeTo("1000", 0.33), p.find(".checkbox").addClass("inactive");
                        }
                    $.DoubleJetski.Quiz._tempLabelID = l.data("resultid"), setTimeout(function () {
                        $.DoubleJetski.Quiz._showNextQuestion();
                    }, 1e3);
                }
            }
        });
    },
	
	_showNextQuestion: function () {
		$.DoubleJetski.Quiz._scoreQuestion();
		
		if (this._currentQuestion >= quiz._totalQuestions - 1){
			(this._showResults(), void 0);
		} else {
			this._currentQuestion++, 
			this._showQuestion(this._currentQuestion);
		
			$("html, body").animate({
				scrollTop: $(".questions").offset().top - $.DoubleJetski.Quiz._headerOffset
			}, 800), 
			// return result undefined
			void 0;
		}
	},
    
	_scoreQuestion: function () {
        if ("test" == quiz._quizType && 100 != $.DoubleJetski.Quiz._tempScore){
			$.DoubleJetski.Quiz._score += $.DoubleJetski.Quiz._tempScore;
		} else if ("points" == quiz._quizType && 100 != $.DoubleJetski.Quiz._tempScore){
			$.DoubleJetski.Quiz._score += $.DoubleJetski.Quiz._tempScore;
		} else if ("label" == quiz._quizType && 100 != $.DoubleJetski.Quiz._tempLabelID){
			$.DoubleJetski.Quiz._labelScore[$.DoubleJetski.Quiz._tempLabelID] += 1;
		}
		
        var storage = [];
		
        storage.push(quiz._quizID), 
		storage.push($.DoubleJetski.Quiz._currentQuestion + 1);
		
		if ("label" == quiz._quizType){
			storage.push($.DoubleJetski.Quiz._labelScore);
		} else {
			storage.push($.DoubleJetski.Quiz._score);
		}
		
		storage = JSON.stringify(storage), 
		sessionStorage.setItem("quiz", storage), 
		$.DoubleJetski.Quiz._tempScore = 100, 
		$.DoubleJetski.Quiz._tempLabelID = 100;
    },
	
	_showResults: function () {
        var e = $(".question" + this._currentQuestion),
            title = $(".detail.quiz h1");
        
        title.css("display", "none");
        
        var n = $(".detail.quiz .introText");
        
        n.css("display", "none"), 
        $(".byline").css("display", "none"), 
        $(".detail.quiz .content-header").addClass("showResults"),
        $(".sharebar").css("display", "none");
        
        var a, i, r = resultsData.length;
        
        if ("test" == quiz._quizType) {
            var o = $.DoubleJetski.Quiz._score + "/" + quiz._totalQuestions;
            
            title.html(o), 
            n.html("answered correctly").addClass("answeredCorrectly");
            
            for (var s = r - 1, limitPosition = 0; r > limitPosition; limitPosition++){
                if ($.DoubleJetski.Quiz._score <= resultsData[limitPosition].limit) {
                    s = limitPosition;
                    break;
                }
                a = resultsData[s].title, 
				i = resultsData[s].desc;
            }
        } else if ("points" == quiz._quizType) {
            var c = $(".detail.quiz .content-header h1").html();
            
            title.html("Your Results!"), n.html(c).addClass("answeredCorrectly");
            
            for (var s = r - 1, l = 0; r > l; l++){
                if ($.DoubleJetski.Quiz._score <= resultsData[l].limit) {
					// first available answer is found so set it
                    s = l;
					a = resultsData[s].title, 
					i = resultsData[s].desc;	
                    break;
                }
            }
        } else if ("label" == quiz._quizType) {
            var c = $(".detail.quiz .content-header h1").html();
            
            t.html("Your Results!"), n.html(c).addClass("answeredCorrectly");
            
            for (var u = 100, d = 0, l = 0; r > l; l++) {
				if ($.DoubleJetski.Quiz._labelScore[l] > d){
					 d = $.DoubleJetski.Quiz._labelScore[l], 
					 u = l;
				}
				
            a = resultsData[u].title, 
			i = resultsData[u].desc;
            }
        }
        
        $(".resultsSection .resultTitle").html(a), 
        $(".resultsSection .resultDescription").html(i),
        $.DoubleJetski.Quiz._setUpResultSharing(), 
        $("html, body").animate({
            scrollTop: $(".detail.quiz").offset().top - $.DoubleJetski.Quiz._headerOffset
        }, 800), e.fadeOut({
            complete: function () {
                title.fadeIn({
                    complete: function () {
                        n.fadeIn({
                            complete: function () {
                                $(".results").fadeIn({
									complete: (function (){
										$.DoubleJetski.Quiz._displayGauge($.DoubleJetski.Quiz._score);
									})
								});
                            }
                        });
                    }
                });
            }
        }); ////,  sessionStorage.removeItem("quiz")
		
		$(".btn.retakeQuiz").on('click', $.DoubleJetski.Quiz._retakeQuiz());
    },
	
	_setUpResultSharing: function () {
        var e = $(".shareresults");
		if (e.length > 0){
			e.each(function () {
            	var e = "",
                	t = encodeURIComponent($(".detail.quiz .content-header .introText").html()),
                	n = encodeURIComponent("http://www.DoubleJetski.com/images/am-i-gay-quiz-logo-600x305.png"),
                	a = encodeURIComponent(document.location.href);
					
					if ("test" == quiz._quizType){
						e = encodeURIComponent("DoubleJetski Quiz: I answered " + $(".detail.quiz h1").html() + " questions correctly.");
					} else if ("points" == quiz._quizType) {
						e = encodeURIComponent("DoubleJetski Quiz: " + $.DoubleJetski.Quiz._stripHTML($(".resultsSection .resultTitle").html())),
						t = $.DoubleJetski.Quiz._stripHTML($(".resultsSection .resultDescription").html());
					} else if ("label" == quiz._quizType) {
						e = encodeURIComponent("DoubleJetski Quiz: " + $.DoubleJetski.Quiz._stripHTML($(".resultsSection .resultTitle").html())), 
						t = $.DoubleJetski.Quiz._stripHTML($(".resultsSection .resultDescription").html());
					}
					
            	var i = "https://www.facebook.com/dialog/feed?app_id=366971830031872&link=" + a + "&name=DoubleJetski.com:%20" + e + "&picture=" + n + "&description=" + t + "&redirect_uri=http://www.facebook.com",
                r = '<a href="' + i + '" class="btn medium lightgray fb" target="_blank"><i class="icon-fbshare"></i>Share Results</a>';
				
////				<a href="#" onclick="shareResults()">Share Results</a>
////					function shareResults() {
////					FB.ui({ method: 'feed', 
////							message: 'Facebook for Websites is super-cool'});
////					}
				
            	$(this).html(r)
        	});
		}
    },
	
	_stripHTML: function (e) {
        var text = document.createElement("DIV");
        return text.innerHTML = e, text.textContent || text.innerText || "";
    },
    
    _getCorrectAnswer: function (e) {
        var t = !1,
            n = 0;
        
        for (var a in e){
			if (e.hasOwnProperty(a)){
				 $(e[a]).data("points") > n;
				 n = $(e[a]).data("points"), 
				 t = a;
			}
		}
        
		return "selector" == t && (t = 0), t;
    },
	
	_speedometerGauge: function() {
		var ops = {
			lines: 12, // The number of lines to draw
			angle: 0.15, // The length of each line
			lineWidth: 0.44, // The line thickness
			
			pointer: {
				length: 0.9, // The radius of the inner circle
				strokeWidth: 0.035, // The rotation offset
				color: '#000000' // Fill color
			},
			
		  limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
		
		  colorStart: '#6FADCF',   // Colors
		  colorStop: '#8FC0DA',    // just experiment with them
		  strokeColor: '#E0E0E0',   // to see which ones work best for you
		  generateGradient: true
		};
	},
	
	_displayGauge: function(score)	{
		var target = document.getElementById('speedometerGauge'), // your canvas element
		gauge = new Gauge(target).setOptions($.DoubleJetski.Quiz._speedometerGauge.ops); // create sexy gauge!
		
		gauge.maxValue = quiz._maxScore ; // set max gauge value
		gauge.animationSpeed = 80; // set animation speed (32 is default value)
		gauge.set(score); // set actual value
	}       
};