/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [candidates, setCandidates] = useState(['Alice', 'Charlie', 'Bob'])
  const [selectedCandidates, setSelectedCandidates] = useState([])
  const [checkDups, setCheckDups] = useState([])
  const [votesArr, setVotesArr] = useState([])
  const [candidatesArr, setCandidatesArr] = useState([])
  const [BobVotes, setBobVotes] = useState([])
  const [AliceVotes, setAliceVotes] = useState([])
  const [charlieVotes, setCharlieVotes] = useState([])
  const [bobRanks, setBobRanks] = useState([])
  const [aliceRanks, setAliceRanks] = useState([])
  const [charlieRanks, setCharlieRanks] = useState([])

  useEffect(() => {
    const bobAsFirst = bobRanks.filter((ranks) => {
      return ranks.firstRank
    })
    const bobAsSecond = bobRanks.filter((ranks) => {
      return ranks.secondRank
    })
    const bobAsThird = bobRanks.filter((ranks) => {
      return ranks.thirdRank
    })
    const charlieAsFirst = charlieRanks.filter((ranks) => {
      return ranks.firstRank
    })
    const charlieAsSecond = charlieRanks.filter((ranks) => {
      return ranks.secondRank
    })
    const charlieAsThird = charlieRanks.filter((ranks) => {
      return ranks.thirdRank
    })
    const aliceAsFirst = aliceRanks.filter((ranks) => {
      return ranks.firstRank
    })
    const aliceAsSecond = aliceRanks.filter((ranks) => {
      return ranks.secondRank
    })
    const aliceAsThird = aliceRanks.filter((ranks) => {
      return ranks.thirdRank
    })

    if (bobAsFirst.length > aliceAsFirst.length) {
      console.log('bob > alice')
    } else if (aliceAsFirst.length > bobAsFirst.length) {
      console.log('alice > bob')
    } else if (aliceAsFirst.length === bobAsFirst.length) {
      if (aliceAsSecond.length > bobAsSecond.length) {
        console.log('alice > bob')
      } else if (bobAsSecond.length > aliceAsSecond.length) {
        console.log('bob > alice')
      } else if (bobAsSecond.length === aliceAsSecond.length) {
        if (bobAsThird.length > aliceAsThird.length) {
          console.log('bob > alice')
        } else if (aliceAsThird.length > bobAsThird.length) {
          console.log('alice > bob')
        } else {
          console.log('alice === bob')
        }
      }

      if (charlieAsFirst.length > aliceAsFirst.length) {
        console.log('charlie > alice')
      } else if (aliceAsFirst.length > charlieAsFirst.length) {
        console.log('alice > charlie')
      } else if (aliceAsFirst.length === charlieAsFirst.length) {
        if (aliceAsSecond.length > charlieAsSecond.length) {
          console.log('alice > charlie')
        } else if (charlieAsSecond.length > aliceAsSecond.length) {
          console.log('charlie > alice')
        } else if (charlieAsSecond.length === aliceAsSecond.length) {
          if (charlieAsThird.length > aliceAsThird.length) {
            console.log('charlie > alice')
          } else if (charlieAsThird.length < aliceAsThird.length) {
            console.log('alice > charlie')
          } else {
            console.log('alice === charlie')
          }
        }
      }
    }
    if (bobAsFirst.length > charlieAsFirst.length) {
      console.log('bob > charlie')
    } else if (charlieAsFirst.length > bobAsFirst.length) {
      console.log('charlie > bob')
    } else if (charlieAsFirst.length === bobAsFirst.length) {
      if (charlieAsSecond.length > bobAsSecond.length) {
        console.log('charlie > bob')
      } else if (bobAsSecond.length > charlieAsSecond.length) {
        console.log('bob > charlie')
      } else if (bobAsSecond.length === charlieAsSecond.length) {
        if (bobAsThird.length > charlieAsThird.length) {
          console.log('bob > charlie')
        } else if (charlieAsThird.length > bobAsThird.length) {
          console.log('charlie > bob')
        } else {
          console.log('charlie === bob')
        }
      }
    }
  }, [bobRanks, aliceRanks, charlieRanks])

  const addCandidate = (candidate, idx) => {
    setCheckDups((prev) => [...prev, candidate])
    if (checkDups.includes(candidate)) return
    setSelectedCandidates((prev) => [...prev, candidate])
  }

  const removeCandidate = async (idxToRemove) => {
    const newSelectedCandidates = selectedCandidates.filter(
      (candidate, idx) => {
        return idxToRemove !== idx
      }
    )
    const newCheckDups = checkDups.filter((dup, idx) => {
      return idxToRemove !== idx
    })
    setSelectedCandidates(newSelectedCandidates)
    setCheckDups(newCheckDups)
  }

  const addVote = (e) => {
    e.preventDefault()
    if (selectedCandidates.length !== 3) {
      return
    }
    setVotesArr((prev) => [
      ...prev,
      [
        ...selectedCandidates.map((candidate) => {
          return candidate
        }),
      ],
    ])
    setCheckDups([])
    setSelectedCandidates([])
  }

  const showWinner = () => {
    votesArr.map((votes) => {
      votes.forEach((vote, idx) => {
        candidatesArr.push({ name: vote, rank: idx + 1 })
      })
    })
    candidatesArr.map((candidate) => {
      if (candidate.name === 'Bob') {
        setBobVotes((prev) => [
          ...prev,
          { rank: candidate.rank, candidate: candidate.name },
        ])
      } else if (candidate.name === 'Alice') {
        setAliceVotes((prev) => [
          ...prev,
          { rank: candidate.rank, candidate: candidate.name },
        ])
      } else {
        setCharlieVotes((prev) => [
          ...prev,
          { rank: candidate.rank, candidate: candidate.name },
        ])
      }
    })

    BobVotes.forEach((vote) => {
      if (vote.rank === 1) {
        setBobRanks((prev) => [...prev, { firstRank: vote.rank }])
      } else if (vote.rank === 2) {
        setBobRanks((prev) => [...prev, { secondRank: vote.rank }])
      } else {
        setBobRanks((prev) => [...prev, { thirdRank: vote.rank }])
      }
    })

    AliceVotes.forEach((vote) => {
      if (vote.rank === 1) {
        setAliceRanks((prev) => [...prev, { firstRank: vote.rank }])
      } else if (vote.rank === 2) {
        setAliceRanks((prev) => [...prev, { secondRank: vote.rank }])
      } else {
        setAliceRanks((prev) => [...prev, { thirdRank: vote.rank }])
      }
    })

    charlieVotes.forEach((vote) => {
      if (vote.rank === 1) {
        setCharlieRanks((prev) => [...prev, { firstRank: vote.rank }])
      } else if (vote.rank === 2) {
        setCharlieRanks((prev) => [...prev, { secondRank: vote.rank }])
      } else {
        setCharlieRanks((prev) => [...prev, { thirdRank: vote.rank }])
      }
    })
  }

  return (
    <div className='App'>
      <form onSubmit={addVote}>
        <div className='candidates-container'>
          <h1>Candidates</h1>
          <div>
            {candidates.map((candidate, idx) => {
              return (
                <span
                  className='candidates'
                  key={idx}
                  onClick={() => addCandidate(candidate, idx)}
                >
                  {candidate}
                </span>
              )
            })}
          </div>
        </div>
        <div className='selected-candidates'>
          {selectedCandidates.map((item, idx) => {
            return (
              <div key={idx} className='shake'>
                {idx + 1}.<span>{item}</span>
                <span className='remove' onClick={() => removeCandidate(idx)}>
                  X
                </span>
              </div>
            )
          })}
        </div>
        <button>Add Vote</button>
      </form>
      <h2>Votes</h2>
      <div className='votes'>
        {votesArr.map((candidate, idx) => {
          return (
            <div key={idx} className='votes-main'>
              <h3>Vote {idx + 1}</h3>
              <div className='vote-div'>
                <div>
                  {candidate.map((candidate, idx) => {
                    return (
                      <span key={idx}>
                        <span>{idx + 1}.</span>
                        <span>{candidate}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={showWinner} disabled={votesArr.length === 0}>
        Show the winner
        <span>(click 2 times)</span>
      </button>
    </div>
  )
}

export default App
