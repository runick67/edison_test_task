import uuid
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from psychics_test.psychic import PsychicsController


psychics_controller = PsychicsController()


def index(request):
    """ Method that calls when user trying to get HTML page from web browser

    :param request: django HTTPRequest
    :return: django HTTPResponse
    """
    response = render(request, 'index.html')
    if not request.COOKIES.get('session_id', None):
        response.set_cookie('session_id', uuid.uuid4())
    return response


@csrf_exempt
def guesses(request):
    """ Method that call when browser trying to ger psychics
    guesses or post number

    :param request: django HTTPRequest
    :return: JSON response
    """
    session_id = request.COOKIES['session_id']
    if request.method == 'GET':
        response = {'guesses': psychics_controller.get_guesses(session_id),
                    'psychics': psychics_controller.get_all(session_id)}
    elif request.method == 'POST':
        try:
            response = {'psychics': psychics_controller.check_all(
                int(request.body), session_id)}
        except ValueError:
            response = {'error': 'Неверно загаданное число. '
                                 'Введите значения от 10 до 99.'}
    return JsonResponse(response)
