import random


class Psychic:
    """Class represents psychic
    """

    def __init__(self, name):
        """ Initializer

        :param name: Psychic name
        """
        self.name = name
        self.last_guess = {}
        self.history = {}
        self._rating = {}

    def get_rating(self, session):
        """ Returns psychic rating for session

        :param session: session id
        :return: psychic rating for session
        """
        return self._rating.setdefault(session, 0)

    def change_rating(self, session, increase_number):
        """ Change psychic rating for session

        :param session: session id
        :param increase_number: the number by which change rating
        """
        self._rating[session] = self.get_rating(session) + increase_number

    def try_to_guess(self, session):
        """ Request psychic guess

        :param session: session id
        :return: psychic guess
        """
        self.last_guess[session] = random.randint(10, 99)
        return self.last_guess[session]

    def check(self, number, session):
        """ Check if psychic is guessed

        :param number: number to check
        :param session: session id
        :return: if psychic is guessed
        """
        self.change_rating(
            session, 1 if self.last_guess[session] == number else -1)
        history = self.history.setdefault(session, [])
        history.append({'number': number, 'guess': self.last_guess[session]})
        return self.last_guess == number


class PsychicsController:
    """Class represents psychics controller
    """

    def __init__(self):
        """ Initializer

        """
        self.psychics = [Psychic('Marilyn Cerro'),
                         Psychic('Olga Dombrovskaya')]

    def get_guesses(self, session):
        """ Get all psychics guesses

        :param session: session id
        :return: list of dict results
        """
        return [{'name': psychic.name,
                 'guess': psychic.try_to_guess(session)}
                for psychic in self.psychics]

    def check_all(self, number, session):
        """ Check all psychics guesses

        :param number: number to check
        :param session: session id
        :return: list of dict results
        """
        for psychics in self.psychics:
            psychics.check(number, session)
        return self.get_all(session)

    def get_all(self, session):
        """ Returns list of dict of all psychics

        :param session: session id
        :return: list of name, history and rating for all psychics
        """
        return [{'name': psychic.name,
                 'history': psychic.history.get(session),
                 'rating': psychic.get_rating(session)}
                for psychic in self.psychics]
